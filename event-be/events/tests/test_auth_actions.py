import pytest
from django.urls import reverse
from events.models import Event
from rest_framework import status



@pytest.mark.django_db
class TestLoginView:

    def test_login(self, client, user, login_payload):
        url = reverse('login')
        response = client.post(url, data=login_payload)

        assert response.status_code == status.HTTP_200_OK







