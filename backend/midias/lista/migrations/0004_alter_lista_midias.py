# Generated by Django 5.1.1 on 2024-11-20 01:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lista', '0003_alter_lista_midias'),
        ('midia', '0005_alter_midia_banner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lista',
            name='midias',
            field=models.ManyToManyField(related_name='+', to='midia.midia'),
        ),
    ]
