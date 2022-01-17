from django.urls import path
from . import views

urlpatterns = [
    path('api/quests/', views.QuestListCreate.as_view()),
    path('api/items/', views.ItemListCreate.as_view()),
    path('api/npcs/', views.NpcListCreate.as_view()),
    path('api/rewards/', views.RewardListCreate.as_view()),
    path('api/steps/', views.StepListCreate.as_view()),
]
