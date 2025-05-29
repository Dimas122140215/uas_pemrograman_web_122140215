# backend/hobiku_api/services/auth_service.py
from ..models.user import User

def register_new_user(dbsession, username, email, password):
    if not username or not email or not password:
        raise ValueError("Missing required fields")

    existing = dbsession.query(User).filter(User.email == email).first()
    if existing:
        raise ValueError("Email already exists")

    user = User(username=username, email=email)
    user.set_password(password)

    dbsession.add(user)
    dbsession.commit()
    return user


def authenticate_user(dbsession, email, password):
    user = dbsession.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not user.check_password(password):
        return None
    return user