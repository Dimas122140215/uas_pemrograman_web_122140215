from ..models import Media, UserMedia, Review, User
from datetime import datetime

class MediaService:
    def __init__(self, dbsession):
        self.dbsession = dbsession

    def create_media(self, media_data):
        """Create a new media entry"""
        media = Media(**media_data)
        self.dbsession.add(media)
        self.dbsession.flush()
        return media

    def get_media_by_id(self, media_id):
        """Get media by ID"""
        return self.dbsession.query(Media).filter(Media.id == media_id).first()

    def get_media_by_type(self, media_type, limit=50, offset=0):
        """Get media by type with pagination"""
        return (self.dbsession.query(Media)
                .filter(Media.type == media_type)
                .limit(limit)
                .offset(offset)
                .all())

    def search_media(self, query, media_type=None, limit=50):
        """Search media by title"""
        q = self.dbsession.query(Media).filter(Media.title.ilike(f"%{query}%"))
        if media_type:
            q = q.filter(Media.type == media_type)
        return q.limit(limit).all()

    def add_media_to_user_list(self, user_id, media_id, status='planning', rating=None, progress=0):
        """Add media to user's tracking list"""
        # Check if already exists
        existing = (self.dbsession.query(UserMedia)
                .filter(UserMedia.user_id == user_id, UserMedia.media_id == media_id)
                .first())
        
        if existing:
            raise ValueError("Media already in user's list")

        user_media = UserMedia(
            user_id=user_id,
            media_id=media_id,
            status=status,
            rating=rating,
            progress=progress
        )
        
        if status == 'watching':
            user_media.started_at = datetime.utcnow()
        elif status == 'completed':
            user_media.completed_at = datetime.utcnow()

        self.dbsession.add(user_media)
        self.dbsession.flush()
        return user_media

    def update_user_media(self, user_id, media_id, update_data):
        """Update user's media tracking"""
        user_media = (self.dbsession.query(UserMedia)
                    .filter(UserMedia.user_id == user_id, UserMedia.media_id == media_id)
                    .first())
        
        if not user_media:
            raise ValueError("Media not found in user's list")

        # Update fields
        for key, value in update_data.items():
            if hasattr(user_media, key):
                setattr(user_media, key, value)

        # Handle status-specific logic
        if 'status' in update_data:
            if update_data['status'] == 'watching' and not user_media.started_at:
                user_media.started_at = datetime.utcnow()
            elif update_data['status'] == 'completed':
                user_media.completed_at = datetime.utcnow()

        user_media.updated_at = datetime.utcnow()
        self.dbsession.flush()
        return user_media

    def get_user_media_list(self, user_id, status=None, media_type=None):
        """Get user's media list with optional filters"""
        query = (self.dbsession.query(UserMedia)
                .join(Media)
                .filter(UserMedia.user_id == user_id))
        
        if status:
            query = query.filter(UserMedia.status == status)
        if media_type:
            query = query.filter(Media.type == media_type)
            
        return query.all()

    def remove_from_user_list(self, user_id, media_id):
        """Remove media from user's list"""
        user_media = (self.dbsession.query(UserMedia)
                    .filter(UserMedia.user_id == user_id, UserMedia.media_id == media_id)
                    .first())
        
        if not user_media:
            raise ValueError("Media not found in user's list")

        self.dbsession.delete(user_media)
        self.dbsession.flush()

class ReviewService:
    def __init__(self, dbsession):
        self.dbsession = dbsession

    def create_review(self, user_id, media_id, title, content):
        """Create a new review"""
        # Check if user has already reviewed this media
        existing = (self.dbsession.query(Review)
                .filter(Review.user_id == user_id, Review.media_id == media_id)
                .first())
        
        if existing:
            raise ValueError("You have already reviewed this media")

        review = Review(
            user_id=user_id,
            media_id=media_id,
            title=title,
            content=content
        )
        
        self.dbsession.add(review)
        self.dbsession.flush()
        return review

    def update_review(self, review_id, user_id, update_data):
        """Update user's review"""
        review = (self.dbsession.query(Review)
                .filter(Review.id == review_id, Review.user_id == user_id)
                .first())
        
        if not review:
            raise ValueError("Review not found")

        for key, value in update_data.items():
            if hasattr(review, key) and key not in ['id', 'user_id', 'media_id', 'created_at']:
                setattr(review, key, value)

        review.updated_at = datetime.utcnow()
        self.dbsession.flush()
        return review

    def delete_review(self, review_id, user_id):
        """Delete user's review"""
        review = (self.dbsession.query(Review)
                .filter(Review.id == review_id, Review.user_id == user_id)
                .first())
        
        if not review:
            raise ValueError("Review not found")

        self.dbsession.delete(review)
        self.dbsession.flush()

    def get_media_reviews(self, media_id, limit=20, offset=0):
        """Get reviews for a specific media"""
        return (self.dbsession.query(Review)
                .join(User)
                .filter(Review.media_id == media_id)
                .order_by(Review.created_at.desc())
                .limit(limit)
                .offset(offset)
                .all())

    def get_user_reviews(self, user_id, limit=20, offset=0):
        """Get reviews by a specific user"""
        return (self.dbsession.query(Review)
                .join(Media)
                .filter(Review.user_id == user_id)
                .order_by(Review.created_at.desc())
                .limit(limit)
                .offset(offset)
                .all())