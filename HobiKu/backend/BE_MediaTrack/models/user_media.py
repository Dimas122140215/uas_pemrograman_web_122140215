from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime
from .meta import Base

class UserMedia(Base):
    __tablename__ = 'user_media'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    media_id = Column(Integer, ForeignKey('media.id'), nullable=False)
    status = Column(String(20), nullable=False)  # watching/completed/planning/dropped/on_hold
    rating = Column(Integer)  # 1-5 scale, nullable until completed
    progress = Column(Integer, default=0)  # episodes watched, chapters read, etc.
    started_at = Column(DateTime)
    completed_at = Column(DateTime)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="user_media")
    media = relationship("Media", back_populates="user_media")

    __table_args__ = (
        UniqueConstraint('user_id', 'media_id', name='uix_user_media'),
    )