import pytest
from django.urls import reverse
from rest_framework import status


@pytest.mark.django_db
class TestLoginView:
    def test_login(self, client, user, payload):

        url = reverse("login")
        response = client.post(url, data={"email": "testuser@gmail.com", "password": "password"})
        assert response.status_code == status.HTTP_200_OK

        token = response.data["token"]["access"]
        headers = {"Authorization": f"Bearer {token}"}
        create_response = client.post(
            reverse("event-create"), data=payload, headers=headers
        )

        assert create_response.status_code == status.HTTP_201_CREATED

    def test_register(self, client, user):
        url = reverse("register")

        register_payload = {
            "email": "testuser@gmail.com",
            "password": "password",
            "first_name": "Test",
            "last_name": "User",
        }

        response = client.post(url, data=register_payload)
        assert response.status_code == status.HTTP_201_CREATED
