from marshmallow import Schema, fields, validate, validates, validates_schema, ValidationError
import re

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=[
        validate.Length(min=3, max=50),
        validate.Regexp(r'^[a-zA-Z0-9_]+$', error="Username: letters, numbers, underscores only")
    ])
    email = fields.Email(required=True, validate=validate.Length(max=100))
    
    @validates('username')
    def validate_username(self, value, **kwargs):  # Add **kwargs
        if value.lower() in ['admin', 'root', 'api', 'null', 'undefined']:
            raise ValidationError('Username not allowed')

class UserSignupSchema(UserSchema):
    password = fields.Str(required=True, validate=validate.Length(min=8, max=128), load_only=True)
    confirm_password = fields.Str(required=True, load_only=True)
    
    @validates('password')
    def validate_password(self, value, **kwargs):  # Add **kwargs here
        patterns = [r'[A-Z]', r'[a-z]', r'[0-9]', r'[!@#$%^&*(),.?":{}|<>]']
        messages = ['uppercase', 'lowercase', 'number', 'special character']
        
        for pattern, msg in zip(patterns, messages):
            if not re.search(pattern, value):
                raise ValidationError(f'Password must contain at least one {msg}')
    
    @validates_schema
    def validate_passwords_match(self, data, **kwargs):
        if data.get('password') != data.get('confirm_password'):
            raise ValidationError('Passwords do not match', 'confirm_password')

class UserLoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True)
    remember_me = fields.Bool(required=False)  # Explicitly not required