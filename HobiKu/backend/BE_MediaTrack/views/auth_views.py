from pyramid.view import view_config
from pyramid.response import Response
import json

from ..schemas.user_schema import UserSignupSchema, UserLoginSchema
from ..services.auth_service import register_new_user, authenticate_user
from ..security import create_jwt_token

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
        return {"message": "Registration successful", "id": user.id}
    except ValueError as e:
        return Response(json.dumps({"error": str(e)}), content_type='application/json', status=400)


@view_config(route_name='login', renderer='json', request_method='POST')
def login_view(request):
    data = request.json_body
    user = authenticate_user(
        request.dbsession,
        data.get('email'),
        data.get('password')
    )
    if not user:
        return Response(json.dumps({"error": "Invalid credentials"}), content_type='application/json', status=401)

    return {
        "token": create_jwt_token(user.id),
        "user": {"id": user.id, "username": user.username}
    }