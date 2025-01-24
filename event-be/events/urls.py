from django.urls import path

from events.views import (
    RegisterUserView,
    EventListView,
    EventCreateView,
    LoginUserView,
    EventUpdateView,
    EventRegistrationView,
)
urlpatterns = [
    path("api/events/", EventListView.as_view(), name="event-list"),
    path("api/events/login/", LoginUserView.as_view(), name="login"),
    path("api/events/register/", RegisterUserView.as_view(), name="register"),
    path("api/events/create/", EventCreateView.as_view(), name="event-create"),
    path("api/events/<int:pk>/update/", EventUpdateView.as_view(), name="event-update"),
    path("api/events/<int:pk>/register/", EventRegistrationView.as_view(), name="event-register"),
]
