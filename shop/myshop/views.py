from django.shortcuts import render
from .models import Product

def index(request):
	return render(request, 'myshop/index.html', {'items': Product.objects.all(), 'item_count': Product.objects.count()})

def search(request):
	return render(request, 'myshop/index.html', {'items': Product.objects.filter(name__contains=request.GET.get('ask'))})

