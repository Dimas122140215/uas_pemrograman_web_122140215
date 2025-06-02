# user_schema.py
from marshmallow import Schema, fields, validate, validates, ValidationError
import re

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=[
        validate.Length(min=3, max=50),
        validate.Regexp(r'^[a-zA-Z0-9_]+$', error="Username: letters, numbers, underscores only")
    ])
    email = fields.Email(required=True, validate=validate.Length(max=100))
    
    @validates('email')
    def validate_email(self, value):
        if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', value):
            raise ValidationError('Invalid email format')
    
    @validates('username')
    def validate_username(self, value):
        if value.lower() in ['admin', 'root', 'api', 'null', 'undefined']:
            raise ValidationError('Username not allowed')

class UserSignupSchema(UserSchema):
    password = fields.Str(required=True, validate=validate.Length(min=8, max=128), load_only=True)
    confirm_password = fields.Str(required=True, load_only=True)
    
    @validates('password')
    def validate_password(self, value):
        patterns = [r'[A-Z]', r'[a-z]', r'[0-9]', r'[!@#$%^&*(),.?":{}|<>]']
        messages = ['uppercase', 'lowercase', 'number', 'special character']
        
        for pattern, msg in zip(patterns, messages):
            if not re.search(pattern, value):
                raise ValidationError(f'Password must contain at least one {msg}')
    
    def validate(self, data, **kwargs):
        errors = super().validate(data, **kwargs)
        if data.get('password') != data.get('confirm_password'):
            errors['confirm_password'] = ['Passwords do not match']
        return errors

class UserLoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True)
    remember_me = fields.Bool(required=False)  # Explicitly not required