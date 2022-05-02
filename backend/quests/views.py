from .models import Quest, Item, Npc, Reward, Step, Job
from .serializers import JobSerializer, QuestSerializer, ItemSerializer, NpcSerializer, RewardSerializer, StepSerializer
from rest_framework import viewsets

# Create your views here.


class QuestViewSet(viewsets.ModelViewSet):
    serializer_class = QuestSerializer
    queryset = Quest.objects.all()


class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()


class NpcViewSet(viewsets.ModelViewSet):
    serializer_class = NpcSerializer
    queryset = Npc.objects.all()


class RewardViewSet(viewsets.ModelViewSet):
    serializer_class = RewardSerializer
    queryset = Reward.objects.all()


class StepViewSet(viewsets.ModelViewSet):
    serializer_class = StepSerializer
    queryset = Step.objects.all()


class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    queryset = Job.objects.all()
