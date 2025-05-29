# backend/hobiku_api/views/auth_views.py
from pyramid.view import view_config
from pyramid.response import Response
import json

from ..services.auth_service import register_new_user, authenticate_user

@view_config(route_name='register', renderer='json', request_method='POST')
def register_view(request):
    data = request.json_body
    try:
        user = register_new_user(
            request.dbsession,
            data.get('username'),
            data.get('email'),
            data.get('password')
        )
        return {
            "message": "Registration successful!",
            "user": {"id": user.id, "username": user.username}
        }
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), content_type='application/json', status=400)


@view_config(route_name='login', renderer='json', request_method='POST')
def login_view(request):
    data = request.json_body
    email = data.get('email')
    password = data.get('password')

    user = authenticate_user(request.dbsession, email, password)
    if not user:
        return Response(json.dumps({"error": "Invalid credentials"}), content_type='application/json', status=401)

    return {
        "message": "Login successful!",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }