# backend/BE_MediaTrack/security.py
import jwt
from datetime import datetime, timedelta
from pyramid.httpexceptions import HTTPUnauthorized
import functools

# You should move this to config/environment variables
JWT_SECRET = 'UAS PEMWEB'  # Change this!
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_HOURS = 24
JWT_EXTENDED_EXPIRATION_HOURS = 168  # 7 days for "remember me"

def create_jwt_token(user_id, extended=False):  # Add extended parameter
    """Create a JWT token for the user"""
    expiration_hours = JWT_EXTENDED_EXPIRATION_HOURS if extended else JWT_EXPIRATION_HOURS
    
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(hours=expiration_hours),
        'iat': datetime.utcnow()
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_jwt_token(token):
    """Decode and validate JWT token"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        raise HTTPUnauthorized('Token expired')
    except jwt.InvalidTokenError:
        raise HTTPUnauthorized('Invalid token')

def get_current_user_id(request):
    """Extract user ID from request authorization header"""
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        raise HTTPUnauthorized('Missing or invalid authorization header')
    
    token = auth_header.split(' ')[1]
    return decode_jwt_token(token)

def require_auth(func):
    """Decorator to require authentication for views"""
    @functools.wraps(func)
    def wrapper(request):
        try:
            user_id = get_current_user_id(request)
            request.user_id = user_id
            return func(request)
        except HTTPUnauthorized:
            raise
    return wrapper