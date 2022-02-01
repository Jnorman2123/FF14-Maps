from rest_framework.routers import DefaultRouter
from .views import QuestViewSet, ItemViewSet, NpcViewSet, RewardViewSet, StepViewSet

router = DefaultRouter()
router.register(r'quests', QuestViewSet, basename='quest')
router.register(r'items', ItemViewSet, basename='items')
router.register(r'npcs', NpcViewSet, basename='npcs')
router.register(r'rewards', RewardViewSet, basename='rewards')
router.register(r'steps', StepViewSet, basename='items')

urlpatterns = router.urls
