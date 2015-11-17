# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('name', models.CharField(verbose_name='Название', max_length=400)),
                ('location', models.CharField(verbose_name='Положение', max_length=400)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('name', models.CharField(verbose_name='Наименование', max_length=200)),
                ('price', models.IntegerField(verbose_name='Цена')),
                ('category', models.ForeignKey(verbose_name='Категория', to='myshop.Categories')),
            ],
        ),
    ]
