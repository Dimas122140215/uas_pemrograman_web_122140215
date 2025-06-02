from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .meta import Base

class Media(Base):
    __tablename__ = 'media'

    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    type = Column(String(20), nullable=False)  # game, film, anime
    description = Column(Text)
    genre = Column(String(100))  # Optional: comma-separated genres
    release_year = Column(Integer)
    image_url = Column(String(500))  # Optional: for media posters/covers
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user_media = relationship("UserMedia", back_populates="media")
    reviews = relationship("Review", back_populates="media")