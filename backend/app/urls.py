from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns =[
    path("user", UserInfo.as_view()),
    path("settings/list",  SettingsList.as_view()),
    path("settings/save/<slug:block>",  SettingsUpdateView.as_view()),
    path("settings/save-multiple",  SettingsUpdateMultipleView.as_view()),
    path("settings/media/upload",  FrontendFileUploadView.as_view()),
    path("settings/media/list", MediaList.as_view()),
    path("settings/media/delete/<int:id>", MediaSettingDestroy.as_view()),
    path("settings/<slug:block>", SettingsSearchView.as_view()),
    path("settings/<slug:block>/<slug:key>", SettingsSearchKeyView.as_view()),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)   + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    
