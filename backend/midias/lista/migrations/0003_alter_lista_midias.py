# Generated by Django 5.1.1 on 2024-11-20 01:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lista', '0002_rename_listas_lista_user'),
        ('midia', '0005_alter_midia_banner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lista',
            name='midias',
            field=models.ManyToManyField(related_name='midias', to='midia.midia'),
        ),
    ]
