from django.shortcuts import render
from .models import Question

def index(request):
	return render(request, 'polls/index.html', {'items': Question.objects.all()})

def search(request):
	return render(request, 'polls/index.html', {'items': Question.objects.filter(question_text__contains=request.GET.get('ask'))})
