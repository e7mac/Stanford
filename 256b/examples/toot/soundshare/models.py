from django.db import models

class Sound(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    audio = models.FilePathField()
    pub_date = models.DateTimeField('date published')
    likes = models.IntegerField()
    udid = models.CharField(max_length=100)
    lat = models.FloatField()
    long = models.FloatField()
    position = models.FilePathField(blank=True,null=True)
    positionSize = models.IntegerField(blank=True,null=True)
    audioSize = models.IntegerField(blank=True,null=True)

class Comment(models.Model):
    sound = models.ForeignKey(Sound)
    text = models.TextField()
    pub_date = models.DateTimeField()