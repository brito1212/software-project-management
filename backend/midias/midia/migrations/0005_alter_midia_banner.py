# Generated by Django 5.1.1 on 2024-11-14 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('midia', '0004_alter_midia_genres'),
    ]

    operations = [
        migrations.AlterField(
            model_name='midia',
            name='banner',
            field=models.ImageField(blank=True, null=True, upload_to='banner'),
        ),
    ]
