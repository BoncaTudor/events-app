import uuid

from django.contrib.auth.models import User
from rest_framework import serializers
from events.models import Event
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)


    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "password"]

    def create(self, validated_data):
        username = uuid.uuid4().hex
        return User.objects.create_user(
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
        username = User.objects.get(email=email)
        user = authenticate(username=username.username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        token_serializer = TokenObtainPairSerializer(
            data={"username": username.username, "password": password}
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
