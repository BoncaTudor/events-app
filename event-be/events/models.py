from django.db import models
from django.contrib.auth.models import User


class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateField()
    participants = models.ManyToManyField(User, related_name="events")
    owner = models.ForeignKey(
        User, related_name="owned_events", on_delete=models.CASCADE
    )
