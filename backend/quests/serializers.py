from rest_framework import serializers
from .models import Quest, Item, Npc, Reward, Step


class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = ("id", "quest_name", "previous_quest", "quest_level",
                  "quest_type", "quest_class", "next_quest")


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ("id", "item_name", "item_quantity")


class NpcSerializer(serializers.ModelSerializer):
    class Meta:
        model = Npc
        fields = ("id", "npc_name", "npc_type", "npc_zone", "npc_location_x",
                  "npc_location_y", "npc_sold_items", "npc_quests")

        def to_representation(self, instance):
            data = super().to_representation(instance)
            data["npc_sold_items"] = ItemSerializer(
                Item.objects.get(pk=data["npc_sold_items"])).data
            data["npc_quests"] = QuestSerializer(
                Quest.objects.get(pk=data["npc_quests"])).data
            return data


class RewardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reward
        fields = ("id", "reward_experience", "reward_gil",
                  "reward_items", "reward_other", "reward_quest")

        def to_representation(self, instance):
            data = super().to_representation(instance)
            data["reward_items"] = ItemSerializer(
                Item.objects.get(pk=data["reward_items"])).data
            data["reward_quest"] = QuestSerializer(
                Quest.objects.get(pk=data["reward_quest"])).data
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
