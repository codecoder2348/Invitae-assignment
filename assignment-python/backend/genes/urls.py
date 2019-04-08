from django.urls import path
from .views import GeneSearch, GeneSuggest

urlpatterns = [
    path('search/', GeneSearch.as_view()),
    path('suggest/', GeneSuggest.as_view())
]
