from sqlalchemy.exc import IntegrityError
from ..models.user import User
import logging

logger = logging.getLogger(__name__)

class AuthenticationError(Exception): pass
class RegistrationError(Exception): pass

def register_new_user(dbsession, username, email, password):
    try:
        if not all([username, email, password]):
            raise RegistrationError("All fields are required")
        
        username, email = username.strip(), email.strip().lower()
        
        if len(username) < 3 or len(password) < 8:
            raise RegistrationError("Username min 3 chars, password min 8 chars")
        
        existing = dbsession.query(User).filter(
            (User.email == email) | (User.username == username)
        ).first()
        if existing:
            field = "Email" if existing.email == email else "Username"
            raise RegistrationError(f"{field} already exists")
        
        user = User(username=username, email=email)
        user.set_password(password)
        dbsession.add(user)
        dbsession.commit()
        
        logger.info(f"User registered: {username}")
        return user
        
    except IntegrityError:
        dbsession.rollback()
        raise RegistrationError("Registration failed: data conflict")
    except RegistrationError:
        dbsession.rollback()
        raise
    except Exception as e:
        dbsession.rollback()
        logger.error(f"Registration error: {e}")
        raise RegistrationError("Registration failed")

def authenticate_user(dbsession, email, password):
    try:
        if not email or not password:
            return None
        
        user = dbsession.query(User).filter(User.email == email.strip().lower()).first()
        if user and user.check_password(password):
            logger.info(f"User authenticated: {email}")
            return user
        
        logger.warning(f"Authentication failed: {email}")
        return None
        
    except Exception as e:
        logger.error(f"Authentication error: {e}")
        return None