from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from rest_framework.pagination import PageNumberPagination
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


class EventPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


class RegisterUserView(APIView):
    def post(self, request):
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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginUserView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(
                {
                    "email": serializer.validated_data[0],
                    "token": serializer.validated_data[1],
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
    #TODO: make it work for FE
    # pagination_class = EventPagination


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


class EventJoinView(APIView):
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
