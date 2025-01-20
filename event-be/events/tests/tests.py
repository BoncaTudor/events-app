import pytest
from django.urls import reverse
from events.models import Event
from rest_framework import status


@pytest.mark.django_db
def test_update_event(authenticated_client, event, payload):
    url = reverse("event-update", kwargs={"pk": event.pk})
    response = authenticated_client.put(url, data=payload)
    event.refresh_from_db()

    assert response.status_code == status.HTTP_200_OK
    assert event.title == payload["title"]
    assert event.description == payload["description"]
    assert str(event.date) == payload["date"]


@pytest.mark.django_db
def test_create_event(authenticated_client, payload):
    url = reverse("event-create")
    response = authenticated_client.post(url, data=payload)

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["title"] == payload["title"]
    assert response.data["description"] == payload["description"]
    assert str(response.data["date"]) == payload["date"]


@pytest.mark.django_db
def test_join_event(authenticated_client, event, user):
    url = reverse("event-join", kwargs={"pk": event.pk})
    authenticated_client.post(url)

    event.refresh_from_db()
    assert event.participants.last() == user


@pytest.mark.django_db
def test_list_event(client):
    url = reverse("event-list")
    response = client.get(url)
    Event.objects.all()
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["count"] == 2
