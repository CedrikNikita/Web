from django.conf.urls import include, url
from polls import views


urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^search$', views.search, name='search'),
]