# Generated by Django 5.1.1 on 2024-11-20 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('midia', '0008_remove_midia_genres_delete_genres_midia_genres'),
    ]

    operations = [
        migrations.AddField(
            model_name='serie',
            name='created_by',
            field=models.CharField(default='alguem', max_length=100),
            preserve_default=False,
        ),
    ]
