from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        self.email = self.email.lower()
        return super().save(*args, **kwargs)

class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateField()
    participants = models.ManyToManyField(CustomUser, related_name="events")
    owner = models.ForeignKey(
        CustomUser, related_name="owned_events", on_delete=models.CASCADE
    )
