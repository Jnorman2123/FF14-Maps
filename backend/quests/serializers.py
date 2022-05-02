from rest_framework import serializers
from .models import Job, Quest, Item, Npc, Reward, Step


class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = ("id", "quest_name", "previous_quest", "quest_level",
                  "quest_type", "quest_class", "next_quest", 'quest_npcs', 'quest_reward')

        def to_representation(self, instance):
            data = super().to_representation(instance)
            data["quest_npcs"] = NpcSerializer(
                Npc.objects.get(pk=data["quest_npcs"])).data
            data["quest_reward"] = RewardSerializer(
                Reward.objects.get(pk=data["quest_reward"])).data
            return data


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ("id", "item_name", "item_quantity", "item_optional")


class NpcSerializer(serializers.ModelSerializer):
    class Meta:
        model = Npc
        fields = ("id", "npc_name", "npc_type", "npc_zone", "npc_location_x",
                  "npc_location_y", "npc_sold_items")

        def to_representation(self, instance):
            data = super().to_representation(instance)
            data["npc_sold_items"] = ItemSerializer(
                Item.objects.get(pk=data["npc_sold_items"])).data
            return data


class RewardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reward
        fields = ("id", "reward_quest_name", "reward_experience", "reward_gil",
                  "reward_items", "reward_other")

        def to_representation(self, instance):
            data = super().to_representation(instance)
            data["reward_items"] = ItemSerializer(
                Item.objects.get(pk=data["reward_items"])).data
            return data


class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ("step_description", "quest_step", "step_npc")

        def to_representation(self, instance):
            data = super().to_representation(instance)
            data["quest_step"] = QuestSerializer(
                Quest.objects.get(pk=data["quest_step"])).data
            data["step_npc"] = NpcSerializer(
                Npc.objects.get(pk=data["step_npc"])).data
            return data


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ("id", "job_name")
