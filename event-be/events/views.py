from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from django.shortcuts import get_object_or_404

from .models import Event
from .serializers import (
    EventCreateSerializer,
    EventSerializer,
    LoginSerializer,
    UserSerializer,
)

class RegisterUserView(APIView):
    serializer_class = UserSerializer

    def post(self, request):
        print("hello ?")
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # JWT token auto-GEN
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response(
                {
                    "id": user.id,
                    "email": user.email,
                    "access_token": access_token,
                    "refresh_token": str(refresh),
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginUserView(APIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(
                {
                    "email": serializer.validated_data.get("email"),
                    "token": serializer.validated_data.get("token"),
                },
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventListView(ListAPIView):
    queryset = (
        Event.objects.all()
        .select_related("owner")
        .prefetch_related("participants")
        .filter(date__gte=timezone.now().date())
        .order_by("date")
    )
    serializer_class = EventSerializer


class EventCreateView(CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class EventUpdateView(UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventCreateSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer(self, *args, **kwargs):
        kwargs["partial"] = True
        return super().get_serializer(*args, **kwargs)

    def perform_update(self, serializer):
        if serializer.instance.owner != self.request.user:
            raise PermissionDenied("You do not have permission to edit this event.")
        serializer.save()


class EventRegistrationView(APIView):
    """
    This view takes care of registering or unregistering an event.
    POST request to register an event.
    PATCH request to unregister an event.(partial update to participants list.)
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        event = get_object_or_404(Event, pk=pk)
        if request.user in event.participants.all():
            return Response(
                {"detail": "You are already a participant."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        event.participants.add(request.user)
        return Response(
            {"detail": "Successfully joined the event."}, status=status.HTTP_200_OK
        )

    def patch(self, request, pk, *args, **kwargs):
        event = get_object_or_404(Event, pk=pk)
        try:
            event.participants.remove(request.user)
        except ValueError:
            return Response(
                "You are not a participant.", status=status.HTTP_400_BAD_REQUEST
            )
        return Response("You left this event.", status=status.HTTP_200_OK)
