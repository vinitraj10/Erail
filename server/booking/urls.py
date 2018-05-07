from django.conf.urls import url
from booking import views

urlpatterns = [
    url(r'^trains/(?P<stn_codes>[\w-]+)/(?P<doj>[\w-]+)$',views.getTrains),
    url(r'^ticket/(?P<train_id>[\d]+)/$',views.bookTicket),
    url(r'^seatinfo/(?P<train_id>[\d]+)/$',views.seatInfo),
    url(r'^mybooking/$',views.myBookings)
]
