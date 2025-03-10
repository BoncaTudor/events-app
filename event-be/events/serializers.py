import uuid

from rest_framework import serializers
from events.models import Event, CustomUser
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import NotFound


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    firstName = serializers.CharField(source='first_name', required=True)
    lastName = serializers.CharField(source='last_name', required=True)


    class Meta:
        model = CustomUser
        fields = ["id", "firstName", "lastName", "email", "password"]

    def create(self, validated_data):
        username = uuid.uuid4().hex
        return CustomUser.objects.create_user(
            email=validated_data["email"],
            username=username,
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        
        user = CustomUser.objects.filter(email=email)
        if not user:
            raise NotFound("User Not Found")
        
        auth_user = authenticate(username=user[0].username, password=password)
        if not auth_user:
            raise serializers.ValidationError("Invalid credentials")
        
        token_serializer = TokenObtainPairSerializer(
            data={"username": user[0].username, "password": password}
        )
        if token_serializer.is_valid():
            return {"email":email, "token":token_serializer.validated_data}
        raise serializers.ValidationError("invalid email or password")


class EventSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField()
    participant_count = serializers.IntegerField(
        source="participants.count", read_only=True
    )

    class Meta:
        model = Event
        fields = ["id", "title", "date", "description", "participant_count", "owner"]

    def get_owner(self, obj):
        return obj.owner.email.split("@")[0]


class EventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ["title", "description", "date"]

    def create(self, validated_data):
        return Event.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)
        instance.date = validated_data.get("date", instance.date)
        instance.save()
        return instance
