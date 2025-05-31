from marshmallow import Schema, fields, validate

class MediaSchema(Schema):
    title = fields.String(required=True, validate=validate.Length(min=1))
    type = fields.String(required=True, validate=validate.OneOf(['game', 'film', 'anime']))
    description = fields.String()
    status = fields.String(validate=validate.OneOf(['watching', 'completed', 'planning', 'paused', 'dropped']))
    rating = fields.Float(validate=validate.Range(min=0, max=10))
    progress = fields.Integer(validate=validate.Range(min=0, max=100))