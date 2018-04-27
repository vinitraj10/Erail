# Made by @vinitraj10
from django.contrib import admin
from booking.models import (
    Trains,
    Stations,
    Routes,
    Ticket
)
# Register your models here.

admin.site.register(Trains)
admin.site.register(Stations)
admin.site.register(Routes)
admin.site.register(Ticket)
