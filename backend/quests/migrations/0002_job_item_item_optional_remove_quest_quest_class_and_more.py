# Generated by Django 4.0.1 on 2022-05-02 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quests', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_name', models.CharField(max_length=25, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='item',
            name='item_optional',
            field=models.BooleanField(default=False),
        ),
        migrations.RemoveField(
            model_name='quest',
            name='quest_class',
        ),
        migrations.AddField(
            model_name='quest',
            name='quest_class',
            field=models.ManyToManyField(to='quests.Job'),
        ),
    ]
