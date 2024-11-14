# Generated by Django 5.1.1 on 2024-11-13 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_alter_user_profile_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='banner',
            field=models.ImageField(blank=True, null=True, upload_to='banner'),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_image',
            field=models.ImageField(blank=True, null=True, upload_to='profile_images'),
        ),
    ]