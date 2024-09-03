"""
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter # for chat system
from chat.route import websocket_urlpatterns # for chat system
from channels.auth import AuthMiddlewareStack # To ensure user is authenticated first

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = get_asgi_application()

# For chat system
application = ProtocolTypeRouter({
    'http': application,
    'websocket': AuthMiddlewareStack(URLRouter(websocket_urlpatterns)) # to be used with authentication required
    # 'websocket': URLRouter(websocket_urlpatterns) # to be used without authentication
})
