from django.urls import path
from .views import AgricultureAnalysisView

urlpatterns = [
    path('analyze/', AgricultureAnalysisView.as_view(), name='agriculture-analyze'),
]
