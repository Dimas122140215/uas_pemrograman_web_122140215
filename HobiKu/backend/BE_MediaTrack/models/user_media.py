from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class UserMedia(Base):
    __tablename__ = 'user_media'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False)
    media_id = Column(Integer, nullable=False)
    status = Column(String(20), nullable=False)
    rating = Column(Float)
    progress = Column(Integer, default=0)
    updated_at = Column(DateTime, default=datetime.utcnow)
    
    __table_args__ = (UniqueConstraint('user_id', 'media_id', name='uix_user_media'),)