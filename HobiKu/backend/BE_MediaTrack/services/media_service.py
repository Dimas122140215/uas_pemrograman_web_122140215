# backend/hobiku_api/services/media_service.py
from ..models.user_media import UserMedia
from sqlalchemy.exc import NoResultFound, IntegrityError
from datetime import datetime

def update_media_tracking(dbsession, user_id, media_id, updated_data):
    try:
        # Find tracked media
        user_media = dbsession.query(UserMedia).filter(
            UserMedia.user_id == user_id,
            UserMedia.media_id == media_id
        ).one()

        # Update fields dynamically
        for key, value in updated_data.items():
            setattr(user_media, key, value)

        user_media.updated_at = datetime.utcnow()
        dbsession.flush()

        return {
            "message": "Media updated successfully",
            "data": {
                "status": user_media.status,
                "rating": user_media.rating,
                "progress": user_media.progress
            }
        }

    except NoResultFound:
        raise ValueError("Media not found in your tracker")
    except Exception as e:
        dbsession.rollback()
        raise e


def delete_media_from_tracker(dbsession, user_id, media_id):
    try:
        user_media = dbsession.query(UserMedia).filter(
            UserMedia.user_id == user_id,
            UserMedia.media_id == media_id
        ).one()

        dbsession.delete(user_media)
        dbsession.flush()

        return {"message": "Media removed from your tracker"}

    except NoResultFound:
        raise ValueError("Media not found in your tracker")
    except Exception as e:
        dbsession.rollback()
        raise e