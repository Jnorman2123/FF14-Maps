from random import choice
from tkinter import CASCADE
from django.db import models

# Create your models here.


class Item(models.Model):
    item_name = models.CharField(max_length=100)
    item_quantity = models.IntegerField()
    item_optional = models.BooleanField(default=False)

    def __str__(self):
        return self.item_name + " " + str(self.item_quantity)


class Npc(models.Model):
    NPC_TYPES = (
        ('NPC', 'NPC'),
        ('Monster', 'Monster'),
        ('Merchant', 'Merchant'),
        ('Delivery Moogle', 'Delivery Moogle'),
        ('Interactable', 'Interactable'),
        ('Aetheryte', 'Aetheryte'),
    )

    ZONE_NAMES = (
        ('Limsa Lominsa Upper Decks (La Noscea)',
         'Limsa Lominsa Upper Decks (La Noscea)'),
        ('Limsa Lominsa Lower Decks (La Noscea)',
         'Limsa Lominsa Lower Decks (La Noscea)'),
        ('Mist (La Noscea)', 'Mist (La Noscea)'),
        ("Wolve's Den Pier (La Noscea)", "Wolve's Den Pier (La Noscea)"),
        ('Middle La Noscea (La Noscea)', 'Middle La Noscea (La Noscea)'),
        ('Lower La Noscea (La Noscea)', 'Lower La Noscea (La Noscea)'),
        ('Eastern La Noscea (La Noscea)', 'Eastern La Noscea (La Noscea)'),
        ('Western La Noscea (La Noscea)', 'Western La Noscea (La Noscea)'),
        ('Upper La Noscea (La Noscea)', 'Upper La Noscea (La Noscea)'),
        ('Outer La Noscea (La Noscea)', 'Outer La Noscea (La Noscea)'),
        ('New Gridania (The Black Shroud)', 'New Gridania (The Black Shroud)'),
        ('Old Gridania (The Black Shroud)', 'Old Gridania (The Black Shroud)'),
        ('The Lavender Beds (The Black Shroud)',
         'The Lavender Beds (The Black Shroud)'),
        ('Central Shroud (The Black Shroud)', 'Central Shroud (The Black Shroud)'),
        ('East Shroud (The Black Shroud)', 'East Shroud (The Black Shroud)'),
        ('South Shroud (The Black Shroud)', 'South Shroud (The Black Shroud)'),
        ('North Shroud (The Black Shroud)', 'North Shroud (The Black Shroud)'),
        ("Ul'dah - Steps of Nald (Thanalan)", "Ul'dah - Steps of Nald (Thanalan)"),
        ("Ul'dah - Steps of Thal (Thanalan)", "Ul'dah - Steps of Thal (Thanalan)"),
        ('Hustings Strip (Thanalan)', 'Hustings Strip (Thanalan)'),
        ('The Goblet (Thanalan)', 'The Goblet (Thanalan)'),
        ('The Gold Saucer (Thanalan)', 'The Gold Saucer (Thanalan)'),
        ('Western Thanalan (Thanalan)', 'Western Thanalan (Thanalan)'),
        ('Eastern Thanalan (Thanalan)', 'Eastern Thanalan (Thanalan)'),
        ('Central Thanalan (Thanalan)', 'Central Thanalan (Thanalan)'),
        ('Southern Thanalan (Thanalan)', 'Southern Thanalan (Thanalan)'),
        ('Northern Thanalan (Thanalan)', 'Northern Thanalan (Thanalan)'),
        ('Foundation (Coerthas)', 'Foundation (Coerthas)'),
        ('The Pillars (Coerthas)', 'The Pillars (Coerthas)'),
        ('Empyreum (Coerthas)', 'Empyreum (Coerthas)'),
        ('Coerthas Central Highlands (Coerthas)',
         'Coerthas Central Highlands (Coerthas)'),
        ('Coerthas Western Highlands (Coerthas)',
         'Coerthas Western Highlands (Coerthas)'),
        ('Mor Dhona (Mor Dhona)', 'Mor Dhona (Mor Dhona)'),
        ("The Sea of Clouds (Abalathia's Spine)",
         "The Sea of Clouds (Abalathia's Spine)"),
        ("Azys Lla (Abalathia's Spine)", "Azys Lla (Abalathia's Spine)"),
        ('Idyllshire (Dravania)', 'Idyllshire (Dravania)'),
        ('The Dravanian Forelands (Dravania)',
         'The Dravanian Foreland (Dravania)'),
        ('The Dravanian Hinterlands (Dravania)',
         'The Dravanian Hinterlands (Dravania)'),
        ('The Churning Mists (Dravania)', 'The Churning Mists (Dravania)'),
        ("Rhalgr's Reach (Gyr Abania)", "Rhalgr's Reach (Gyr Abania)"),
        ('The Fringes (Gyr Abania)', 'The Fringes (Gyr Abania)'),
        ('The Peaks (Gyr Abania)', 'The Peaks (Gyr Abania)'),
        ('The Lochs (Gyr Abania)', 'The Lochs (Gyr Abania)'),
        ('Kugane (Hingashi)', 'Kugane (Hingashi)'),
        ('Shirogane (Hingashi)', 'Shirogane (Hingashi)'),
        ('The Ruby Sea (Othard)', 'The Ruby Sea (Othard)'),
        ('Yanxia (Othard)', 'Yanxia (Othard)'),
        ('The Azim Steppe (Othard)', 'The Azim Steppe (Othard)'),
        ('Crystarium (Norvandt)', 'Crystarium (Norvandt)'),
        ('Lakeland (Norvandt)', 'Lakeland (Norvandt)'),
        ('Eulmore (Norvandt)', 'Eulmore (Norvandt)'),
        ('Kholusia (Norvandt)', 'Kholusia (Norvandt)'),
        ('Amh Araeng (Norvandt)', 'Amh Araeng (Norvandt)'),
        ('Il Mheg (Norvandt)', 'Il Mheg (Norvandt)'),
        ("The Rak'tika Greatwood (Norvandt)", "The Rak'tika Greatwood (Norvandt)"),
        ('The Tempest (Norvandt)', 'The Tempest (Norvandt)'),
        ('Old Sharlayan (The Northern Empty)',
         'Old Sharlayan (The Northern Empty)'),
        ('Labyrinthos (The Northern Empty)', 'Labyrinthos (The Northern Empty)'),
        ('Garlemald (Ilsabard)', 'Garlemald (Ilsabard)'),
        ('Radz-at-Han (Ilsabard)', 'Radz-at-Han (Ilsabard)'),
        ('Thavnair (Ilsabard)', 'Thavnair (Ilsabard)'),
        ('Mare Lamentorum (The Sea of Stars)',
         'Mare Lamentorum (The Sea of Stars)'),
        ('Ultima Thule (The Sea of Stars)', 'Ultima Thule (The Sea of Stars)'),
        ('Elpis (The World Unsundered)', 'Elpis (The World Unsundered)'),
    )

    npc_name = models.CharField(max_length=100, unique=True)
    npc_type = models.CharField(max_length=25, choices=NPC_TYPES)
    npc_zone = models.CharField(max_length=250, choices=ZONE_NAMES)
    npc_location_x = models.DecimalField(max_digits=3, decimal_places=1)
    npc_location_y = models.DecimalField(max_digits=3, decimal_places=1)
    npc_sold_items = models.ManyToManyField(Item)

    def __str__(self):
        return self.npc_name


class Reward(models.Model):
    reward_quest_name = models.CharField(max_length=250, unique=True)
    reward_experience = models.IntegerField()
    reward_gil = models.IntegerField()
    reward_items = models.ManyToManyField(Item)
    reward_other = models.CharField(max_length=100)

    def __str__(self):
        return self.reward_quest_name


class Job(models.Model):
    job_name = models.CharField(max_length=25, unique=True)

    def __str__(self):
        return self.job_name


class Quest(models.Model):
    QUEST_TYPES = (
        ('Main Story', 'Main Story'),
        ('Class', 'Class'),
        ('Side', 'Side'),
        ('Hunting Log', 'Hunting Log'),
    )

    quest_name = models.CharField(max_length=250, unique=True)
    previous_quest = models.CharField(max_length=250)
    quest_level = models.IntegerField()
    quest_type = models.CharField(max_length=25, choices=QUEST_TYPES)
    quest_class = models.ManyToManyField(Job)
    next_quest = models.CharField(max_length=250)
    quest_npcs = models.ManyToManyField(Npc, through='Step')
    quest_reward = models.OneToOneField(
        Reward, on_delete=models.CASCADE, primary_key=False)

    def __str__(self):
        return self.quest_name


class Step(models.Model):
    step_description = models.CharField(max_length=250, unique=True)
    quest_step = models.ForeignKey(Quest, on_delete=models.CASCADE)
    step_npc = models.ForeignKey(Npc, on_delete=models.CASCADE)

    def __str__(self):
        return self.step_description
