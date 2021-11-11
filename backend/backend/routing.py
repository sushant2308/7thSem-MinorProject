from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

import iot.routing

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(  # populates conn scope with auth'd user
        URLRouter(
            iot.routing.websocket_urlpatterns
        )
    ),
})