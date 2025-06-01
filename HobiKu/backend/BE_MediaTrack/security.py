from datetime import datetime, timedelta
from typing import Dict
from marshmallow.exceptions import ValidationError
import jwt

JWT_SECRET = "AKU JAWA"
JWT_ALGORITHM = "HS256"
JWT_EXP_DELTA = timedelta(hours=1)

def create_jwt_token(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + JWT_EXP_DELTA
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_jwt_token(token):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload["user_id"]
    except jwt.ExpiredSignatureError:
        raise ValidationError("Token expired")
    except jwt.InvalidTokenError:
        raise ValidationError("Invalid token")

def get_user_id_from_request(request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise ValidationError("Missing or invalid Authorization header")
    token = auth_header.split(" ")[1]
    return decode_jwt_token(token)