from soundshare.models import Sound, Comment
from django.http import HttpResponse
from django.core import serializers
from django.shortcuts import get_object_or_404
import logging
from django.views.decorators.csrf import csrf_exempt
import datetime
from django.conf import settings


def sounds(request):
    sounds = Sound.objects.all().order_by('-pub_date')
    json_serializer = serializers.get_serializer("json")()
    output = json_serializer.serialize(sounds, ensure_ascii=False)
    return HttpResponse(output, content_type="application/json")

@csrf_exempt
def sound(request):
    logging.debug(request.POST)
    logging.debug("NAME: %s", request.POST["name"])
    try:
        if request.POST:
            sound = Sound(name=request.POST["name"], 
                          description=request.POST["description"],
                          udid=request.POST["udid"],
                          lat=request.POST["lat"],
                          long=request.POST["long"],
                          audioSize=request.POST["audioSize"],
                          positionSize=request.POST["posSize"],                          
                          pub_date=datetime.datetime.now(),
                          likes=0)
            file = request.FILES["audioFile"]
            sound.audio = file.name
            sound.save()
            logging.debug("this is the sound id: %d", sound.id)
            sound_id = sound.id
            destination = open(settings.MEDIA_ROOT + 'audio_' + str(sound_id), 'wb+')
            for chunk in file.chunks():
                destination.write(chunk)
            destination.close()
            file = request.FILES["posFile"]
            sound.position = file.name
            destination = open(settings.MEDIA_ROOT + 'pos_' + str(sound_id), 'wb+')
            for chunk in file.chunks():
                destination.write(chunk)
            destination.close()
        
    except Exception, e:
        sound.delete()
        logging.debug(e)
    return HttpResponse('ok')
#    else:
#        sound = Sound.objects.filter(id=sound_id)
#        json_serializer = serializers.get_serializer("json")()
#        output = json_serializer.serialize(sound, ensure_ascii=False)
#        return HttpResponse(output, content_type="application/json")