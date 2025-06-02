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
        # Generate a random salt
        salt = secrets.token_hex(16)
        # Hash password with salt
        hash_obj = hashlib.sha256((salt + password).encode())
        # Store salt + hash together
        self.password_hash = salt + hash_obj.hexdigest()

    def check_password(self, password):
        if not self.password_hash or len(self.password_hash) < 32:
            return False
        # Extract salt from stored hash (first 32 characters)
        salt = self.password_hash[:32]
        # Hash the provided password with the same salt
        hash_obj = hashlib.sha256((salt + password).encode())
        # Compare with stored hash
        return self.password_hash == salt + hash_obj.hexdigest()