import pytest
from django.contrib.auth import get_user_model
from events.models import Event
from rest_framework.test import APIClient


@pytest.fixture
def payload():
    return {
        "title": "Update Event Title",
        "description": "Update Event Description",
        "date": "2029-01-01",
    }


@pytest.fixture
def user():
    return get_user_model().objects.create_user(
        email="testuser@gmail.com", username="testuser", password="password"
    )


@pytest.fixture(autouse=True)
def event(user):
    return Event.objects.create(
        title="Test Event",
        description="Test Event Description",
        date="2026-04-04",
        owner=user,
    )


@pytest.fixture(autouse=True)
def other_event(user):
    return Event.objects.create(
        title="Test Other Event",
        description="Test Other Event Description",
        date="2027-01-01",
        owner=user,
    )


@pytest.fixture(autouse=True)
def past_event(user):
    return Event.objects.create(
        title="Test Past Event",
        description="Test Past Event Description",
        date="2024-01-01",
        owner=user,
    )


@pytest.fixture
def authenticated_client(user):
    client = APIClient()
    client.force_authenticate(user=user)
    return client
