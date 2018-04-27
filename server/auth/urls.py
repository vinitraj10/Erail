from django.conf.urls import url
from auth import views

urlpatterns = [
    url(r'^signin/$',views.signin),
    url(r'^signup/$',views.signup)
]
