from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
import json

from ..schemas.media_schema import MediaSchema, UserMediaSchema, ReviewSchema
from ..services.media_service import MediaService, ReviewService
from ..security import require_auth
from marshmallow import ValidationError

media_schema = MediaSchema()
user_media_schema = UserMediaSchema()
review_schema = ReviewSchema()

# Media CRUD Operations
@view_config(route_name='create_media', renderer='json', request_method='POST')
@require_auth
def create_media_view(request):
    """Create a new media entry"""
    try:
        media_data = media_schema.load(request.json_body)
        service = MediaService(request.dbsession)
        media = service.create_media(media_data)
        request.dbsession.commit()
        return media_schema.dump(media)
    except ValidationError as e:
        return Response(json.dumps({"errors": e.messages}), 
                    content_type='application/json', status=400)
    except Exception as e:
        request.dbsession.rollback()
        return Response(json.dumps({"error": str(e)}), 
                    content_type='application/json', status=500)

@view_config(route_name='get_media', renderer='json', request_method='GET')
def get_media_view(request):
    """Get media by type with optional search"""
    media_type = request.matchdict['type']
    search_query = request.params.get('search')
    limit = int(request.params.get('limit', 50))
    offset = int(request.params.get('offset', 0))
    
    service = MediaService(request.dbsession)
    
    if search_query:
        media_list = service.search_media(search_query, media_type, limit)
    else:
        media_list = service.get_media_by_type(media_type, limit, offset)
    
    return media_schema.dump(media_list, many=True)

# User Media List Operations
@view_config(route_name='add_to_list', renderer='json', request_method='POST')
@require_auth
def add_to_list_view(request):
    """Add media to user's tracking list"""
    try:
        data = user_media_schema.load(request.json_body)
        service = MediaService(request.dbsession)
        
        user_media = service.add_media_to_user_list(
            user_id=request.user_id,
            media_id=data['media_id'],
            status=data['status'],
            rating=data.get('rating'),
            progress=data.get('progress', 0)
        )
        
        request.dbsession.commit()
        return user_media_schema.dump(user_media)
    except ValueError as e:
        return Response(json.dumps({"error": str(e)}), 
                    content_type='application/json', status=400)
    except ValidationError as e:
        return Response(json.dumps({"errors": e.messages}), 
                    content_type='application/json', status=400)

@view_config(route_name='update_user_media', renderer='json', request_method='PUT')
@require_auth
def update_user_media_view(request):
    """Update user's media tracking"""
    try:
        media_id = int(request.matchdict['media_id'])
        data = request.json_body
        
        service = MediaService(request.dbsession)
        user_media = service.update_user_media(request.user_id, media_id, data)
        
        request.dbsession.commit()
        return user_media_schema.dump(user_media)
    except ValueError as e:
        return Response(json.dumps({"error": str(e)}), 
                    content_type='application/json', status=400)

@view_config(route_name='get_user_list', renderer='json', request_method='GET')
@require_auth
def get_user_list_view(request):
    """Get user's media list"""
    status = request.params.get('status')
    media_type = request.params.get('type')
    
    service = MediaService(request.dbsession)
    user_media_list = service.get_user_media_list(request.user_id, status, media_type)
    
    return user_media_schema.dump(user_media_list, many=True)

@view_config(route_name='remove_from_list', renderer='json', request_method='DELETE')
@require_auth
def remove_from_list_view(request):
    """Remove media from user's list"""
    try:
        media_id = int(request.matchdict['media_id'])
        service = MediaService(request.dbsession)
        service.remove_from_user_list(request.user_id, media_id)
        
        request.dbsession.commit()
        return {"message": "Media removed from list"}
    except ValueError as e:
        return Response(json.dumps({"error": str(e)}), 
                    content_type='application/json', status=400)

# Review Operations
@view_config(route_name='create_review', renderer='json', request_method='POST')
@require_auth
def create_review_view(request):
    """Create a new review"""
    try:
        data = review_schema.load(request.json_body)
        service = ReviewService(request.dbsession)
        
        review = service.create_review(
            user_id=request.user_id,
            media_id=data['media_id'],
            title=data.get('title', ''),
            content=data['content']
        )
        
        request.dbsession.commit()
        return review_schema.dump(review)
    except ValueError as e:
        return Response(json.dumps({"error": str(e)}), 
                    content_type='application/json', status=400)
    except ValidationError as e:
        return Response(json.dumps({"errors": e.messages}), 
                    content_type='application/json', status=400)

@view_config(route_name='update_review', renderer='json', request_method='PUT')
@require_auth
def update_review_view(request):
    """Update user's review"""
    try:
        review_id = int(request.matchdict['review_id'])
        data = request.json_body
        
        service = ReviewService(request.dbsession)
        review = service.update_review(review_id, request.user_id, data)
        
        request.dbsession.commit()
        return review_schema.dump(review)
    except ValueError as e:
        return Response(json.dumps({"error": str(e)}), 
                       content_type='application/json', status=400)

@view_config(route_name='delete_review', renderer='json', request_method='DELETE')
@require_auth
def delete_review_view(request):
    """Delete user's review"""
    try:
        review_id = int(request.matchdict['review_id'])
        service = ReviewService(request.dbsession)
        service.delete_review(review_id, request.user_id)
        
        request.dbsession.commit()
        return {"message": "Review deleted"}
    except ValueError as e:
        return Response(json.dumps({"error": str(e)}), 
                       content_type='application/json', status=400)

@view_config(route_name='get_media_reviews', renderer='json', request_method='GET')
def get_media_reviews_view(request):
    """Get reviews for a specific media"""
    media_id = int(request.matchdict['media_id'])
    limit = int(request.params.get('limit', 20))
    offset = int(request.params.get('offset', 0))
    
    service = ReviewService(request.dbsession)
    reviews = service.get_media_reviews(media_id, limit, offset)
    
    return review_schema.dump(reviews, many=True)

@view_config(route_name='get_user_reviews', renderer='json', request_method='GET')
@require_auth
def get_user_reviews_view(request):
    """Get reviews by current user"""
    limit = int(request.params.get('limit', 20))
    offset = int(request.params.get('offset', 0))
    
    service = ReviewService(request.dbsession)
    reviews = service.get_user_reviews(request.user_id, limit, offset)
    
    return review_schema.dump(reviews, many=True)