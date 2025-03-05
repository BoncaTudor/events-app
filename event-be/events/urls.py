from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from events.views import (EventCreateView, EventListView,
                          EventRegistrationView, EventUpdateView,
                          LoginUserView, RegisterUserView)

urlpatterns = [
    path("api/events/", EventListView.as_view(), name="event-list"),
    path("api/events/login/", LoginUserView.as_view(), name="login"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/events/register/", RegisterUserView.as_view(), name="register"),
    path("api/events/create/", EventCreateView.as_view(), name="event-create"),
    path("api/events/<int:pk>/update/", EventUpdateView.as_view(), name="event-update"),
    path(
        "api/events/<int:pk>/register/",
        EventRegistrationView.as_view(),
        name="event-register",
    ),
]
