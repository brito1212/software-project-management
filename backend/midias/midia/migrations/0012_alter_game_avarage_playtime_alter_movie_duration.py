# Generated by Django 5.1.1 on 2024-11-20 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('midia', '0011_remove_game_avarage_price_remove_game_release_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='avarage_playtime',
            field=models.DurationField(),
        ),
        migrations.AlterField(
            model_name='movie',
            name='duration',
            field=models.DurationField(),
        ),
    ]
