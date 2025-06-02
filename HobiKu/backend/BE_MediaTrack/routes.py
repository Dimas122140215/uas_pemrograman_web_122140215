# backend/BE_MediaTrack/routes.py
def includeme(config):
    """Route configuration"""
    
    # Authentication routes
    config.add_route('register', '/api/auth/register', request_method='POST')
    config.add_route('login', '/api/auth/login', request_method='POST')
    
    # Media routes
    config.add_route('create_media', '/api/media', request_method='POST')
    config.add_route('get_media', '/api/media/{type}', request_method='GET')
    
    # User Media List routes - Fixed with request_method parameter
    config.add_route('add_to_list', '/api/user/media', request_method='POST')
    config.add_route('get_user_list', '/api/user/media', request_method='GET')
    config.add_route('update_user_media', '/api/user/media/{media_id}', request_method='PUT')
    config.add_route('remove_from_list', '/api/user/media/{media_id}', request_method='DELETE')
    
    # Review routes
    config.add_route('create_review', '/api/reviews', request_method='POST')
    config.add_route('update_review', '/api/reviews/{review_id}', request_method='PUT')
    config.add_route('delete_review', '/api/reviews/{review_id}', request_method='DELETE')
    config.add_route('get_media_reviews', '/api/media/{media_id}/reviews', request_method='GET')
    config.add_route('get_user_reviews', '/api/user/reviews', request_method='GET')