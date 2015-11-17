# coding=utf-8
from django.db import models

class Categories(models.Model):
    name = models.CharField(u"Название", max_length=400)
    location = models.CharField(u"Положение", max_length=400)

    def __str__(self):
        return self.name;

class Product(models.Model):
    category = models.ForeignKey(Categories, verbose_name=u"Категория")
    name = models.CharField(u"Наименование", max_length=200)
    price = models.IntegerField(u"Цена")

    def __str__(self):
        return self.name;