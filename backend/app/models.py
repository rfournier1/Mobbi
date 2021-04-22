from django.db import models

# Create your models here.

class Setting(models.Model):

    key = models.CharField(max_length=30)
    block =  models.CharField(max_length=30, default="")
    value = models.TextField()

    class Meta:
        unique_together = ('key', 'block',)

    def __str__(self):
        return (self.key + " : " + self.value)


class MediaSetting(models.Model):

    media = models.ImageField(upload_to="contents/frontend")

    @property
    def media_url(self):
        img_url = self.media.url
        return img_url

