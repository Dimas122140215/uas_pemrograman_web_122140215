from marshmallow import Schema, fields, validate

class MediaSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True, validate=validate.Length(min=1, max=255))
    type = fields.Str(required=True, validate=validate.OneOf(['anime', 'game', 'film']))
    description = fields.Str()
    genre = fields.Str()
    release_year = fields.Int(validate=validate.Range(min=1900, max=2030))
    image_url = fields.Url()
    created_at = fields.DateTime(dump_only=True)

class UserMediaSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(dump_only=True)
    media_id = fields.Int(required=True)
    status = fields.Str(required=True, validate=validate.OneOf([
        'planning', 'watching', 'completed', 'on_hold', 'dropped'
    ]))
    rating = fields.Int(validate=validate.Range(min=0, max=5), allow_none=True)
    progress = fields.Int(validate=validate.Range(min=0))  # Removed default=0
    started_at = fields.DateTime(allow_none=True)
    completed_at = fields.DateTime(allow_none=True)
    updated_at = fields.DateTime(dump_only=True)
    
    # Nested media info for responses
    media = fields.Nested(MediaSchema, dump_only=True)

class ReviewSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(dump_only=True)
    media_id = fields.Int(required=True)
    title = fields.Str(validate=validate.Length(max=255))  # Removed default=''
    content = fields.Str(required=True, validate=validate.Length(min=1, max=2000))
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    
    # Nested info for responses
    media = fields.Nested(MediaSchema, dump_only=True)
    user = fields.Method("get_user_info", dump_only=True)
    
    def get_user_info(self, obj):
        return {"id": obj.user.id, "username": obj.user.username}