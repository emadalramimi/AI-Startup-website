from django.db import models
from django.utils.text import slugify

# Create your models here.

class CaseStudy(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, null=True)  # Allow blank for auto-generation
    description = models.TextField()
    client_name = models.CharField(max_length=200, blank=True)  # Client name
    client_industry = models.CharField(max_length=200, blank=True)  # Client industry
    challenge = models.TextField(blank=True)  # Optional
    solution = models.TextField(blank=True)   # Optional
    results = models.TextField(blank=True)    # Optional
    image = models.ImageField(upload_to='case_studies/', null=True, blank=True)
    order = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        # Generate slug from title if not provided
        if not self.slug:
            self.slug = slugify(self.title)
        
        # Ensure unique slug
        original_slug = self.slug
        counter = 1
        while CaseStudy.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
            self.slug = f"{original_slug}-{counter}"
            counter += 1
        
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order', 'title']
        verbose_name_plural = 'Case Studies'
