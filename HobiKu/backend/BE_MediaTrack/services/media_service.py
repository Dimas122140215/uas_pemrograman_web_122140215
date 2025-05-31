from ..models.user_media import UserMedia
from ..models.media import Media
from marshmallow.exceptions import ValidationError
from ..schemas.media_schema import MediaSchema

def add_media_to_user(dbsession, user_id, media_data):
    schema = MediaSchema(partial=True)
    try:
        data = schema.load(media_data)
    except ValidationError as err:
        raise ValueError(err.messages)

    # Check if media already exists
    existing = dbsession.query(Media).filter(Media.title == data['title'], Media.type == data.get('type')).first()
    if not existing:
        existing = Media(title=data['title'], type=data.get('type', 'film'), description=data.get('description', ''))
        dbsession.add(existing)
        dbsession.flush()

    # Check if already added to tracker
    tracked = dbsession.query(UserMedia).filter(UserMedia.user_id == user_id, UserMedia.media_id == existing.id).first()
    if tracked:
        return {"error": "Already in your tracker"}

    user_media = UserMedia(
        user_id=user_id,
        media_id=existing.id,
        status=data.get('status', 'planning'),
        rating=data.get('rating'),
        progress=data.get('progress', 0)
    )

    dbsession.add(user_media)
    return {
        "message": "Added to tracker",
        "media": existing.title,
        "status": user_media.status
    }