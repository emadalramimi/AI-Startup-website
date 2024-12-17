from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from case_studies.views import CaseStudyViewSet

router = DefaultRouter()
router.register(r'services', views.ServiceViewSet)
router.register(r'team', views.TeamMemberViewSet)
router.register(r'contact', views.ContactMessageViewSet)
router.register(r'case-studies', CaseStudyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
