from django.conf.urls.defaults import *
from django.conf import settings

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
                       
                       url(r'^sounds/(?P<path>.*)$', 'django.views.static.serve',
                           {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),                       
                       url(r'^soundshare/sounds$', 'soundshare.views.sounds'),
                       url(r'^soundshare/sound$', 'soundshare.views.sound'),
                       url(r'^soundshare/sound/(?P<sound_id>\d+)/$', 'soundshare.views.sound'),
                       
                       url(r'^soundshare/sounds/(?P<path>.*)$', 'django.views.static.serve',
                           {'document_root': settings.MEDIA_ROOT}),
                       
                       # Example:
                       # (r'^toot/', include('toot.foo.urls')),
                       
                       # Uncomment the admin/doc line below and add 'django.contrib.admindocs' 
                       # to INSTALLED_APPS to enable admin documentation:
                       # (r'^admin/doc/', include('django.contrib.admindocs.urls')),
                       
                       # Uncomment the next line to enable the admin:
                       # (r'^admin/', include(admin.site.urls)),
                       )