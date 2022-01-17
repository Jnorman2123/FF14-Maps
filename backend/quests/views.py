from .models import Quest, Item, Npc, Reward, Step
from .serializers import QuestSerializer, ItemSerializer, NpcSerializer, RewardSerializer, StepSerializer
from rest_framework import generics

# Create your views here.


class QuestListCreate(generics.ListCreateAPIView):
    queryset = Quest.objects.all()
    serializer_class = QuestSerializer


class ItemListCreate(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class NpcListCreate(generics.ListCreateAPIView):
    queryset = Npc.objects.all()
    serializer_class = NpcSerializer


class RewardListCreate(generics.ListCreateAPIView):
    queryset = Reward.objects.all()
    serializer_class = RewardSerializer


class StepListCreate(generics.ListCreateAPIView):
    queryset = Step.objects.all()
    serializer_class = StepSerializer
