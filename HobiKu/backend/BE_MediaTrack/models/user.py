from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import hashlib
import secrets
from .meta import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user_media = relationship("UserMedia", back_populates="user")
    reviews = relationship("Review", back_populates="user")

    def set_password(self, password):
        salt = secrets.token_hex(16)
        hash_obj = hashlib.sha256((salt + password).encode())
        self.password_hash = salt + hash_obj.hexdigest()

    def check_password(self, password):
        if not self.password_hash or len(self.password_hash) < 32:
            return False
        salt = self.password_hash[:32]
        hash_obj = hashlib.sha256((salt + password).encode())
        return self.password_hash == salt + hash_obj.hexdigest()