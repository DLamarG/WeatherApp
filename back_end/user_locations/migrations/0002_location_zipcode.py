# Generated by Django 4.2.7 on 2023-12-11 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_locations', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='zipcode',
            field=models.CharField(default='00000', max_length=20),
        ),
    ]
