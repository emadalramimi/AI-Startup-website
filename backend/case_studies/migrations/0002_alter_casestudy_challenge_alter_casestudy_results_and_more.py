# Generated by Django 5.1.4 on 2024-12-14 09:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('case_studies', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='casestudy',
            name='challenge',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='casestudy',
            name='results',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='casestudy',
            name='slug',
            field=models.SlugField(blank=True, unique=True),
        ),
        migrations.AlterField(
            model_name='casestudy',
            name='solution',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='casestudy',
            name='technologies',
            field=models.JSONField(blank=True, default=list),
        ),
    ]
