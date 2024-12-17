from django.contrib import admin
from .models import CaseStudy

# Register your models here.

@admin.register(CaseStudy)
class CaseStudyAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'order', 'client_name', 'client_industry')
    list_filter = ('client_industry',)
    search_fields = ('title', 'description', 'client_name', 'client_industry')
    prepopulated_fields = {'slug': ('title',)}
