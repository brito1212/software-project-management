# Generated by Django 5.1.1 on 2024-11-20 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('midia', '0005_alter_midia_banner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='avarage_playtime',
            field=models.CharField(max_length=100),
        ),
    ]
