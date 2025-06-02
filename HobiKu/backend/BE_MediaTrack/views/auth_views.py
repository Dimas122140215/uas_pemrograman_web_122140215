from pyramid.view import view_config
from pyramid.httpexceptions import HTTPBadRequest, HTTPUnauthorized, HTTPConflict, HTTPInternalServerError
from marshmallow import ValidationError
import logging

from ..schemas.user_schema import UserSignupSchema, UserLoginSchema, UserSchema
from ..services.auth_service import register_new_user, authenticate_user, RegistrationError
from ..security import create_jwt_token

logger = logging.getLogger(__name__)

def format_errors(errors):
    return {field: (msgs[0] if isinstance(msgs, list) else msgs) for field, msgs in errors.items()}

@view_config(route_name='register', renderer='json', request_method='POST')
def register_view(request):
    try:
        validated_data = UserSignupSchema().load(request.json_body)
        user = register_new_user(
            request.dbsession,
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return {
            "message": "Registration successful",
            "user": UserSchema().dump(user)
        }
    except ValidationError as e:
        return HTTPBadRequest(json_body={"error": "Validation failed", "details": format_errors(e.messages)})
    except RegistrationError as e:
        return HTTPConflict(json_body={"error": str(e)})
    except Exception as e:
        logger.error(f"Registration error: {e}")
        return HTTPInternalServerError(json_body={"error": "Registration failed"})

@view_config(route_name='login', renderer='json', request_method='POST')
def login_view(request):
    try:
        validated_data = UserLoginSchema().load(request.json_body)
        user = authenticate_user(request.dbsession, validated_data['email'], validated_data['password'])
        
        if not user:
            return HTTPUnauthorized(json_body={"error": "Invalid credentials"})
        
        token = create_jwt_token(user.id, extended=validated_data.get('remember_me', False))
        return {
            "message": "Login successful",
            "token": token,
            "user": UserSchema().dump(user)
        }
    except ValidationError as e:
        return HTTPBadRequest(json_body={"error": "Validation failed", "details": format_errors(e.messages)})
    except Exception as e:
        logger.error(f"Login error: {e}")
        return HTTPInternalServerError(json_body={"error": "Login failed"})