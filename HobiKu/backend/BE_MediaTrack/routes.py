# backend/BE_MediaTrack/routes.py
def includeme(config):
    """Route configuration"""
    
    # Authentication routes
    config.add_route('register', '/api/auth/register')
    config.add_route('login', '/api/auth/login')
    
    # Media routes
    config.add_route('create_media', '/api/media')
    config.add_route('get_media', '/api/media/{type}')
    
    # User Media List routes
    config.add_route('add_to_list', '/api/user/media')
    config.add_route('update_user_media', '/api/user/media/{media_id}')
    config.add_route('get_user_list', '/api/user/media')
    config.add_route('remove_from_list', '/api/user/media/{media_id}')
    
    # Review routes
    config.add_route('create_review', '/api/reviews')
    config.add_route('update_review', '/api/reviews/{review_id}')
    config.add_route('delete_review', '/api/reviews/{review_id}')
    config.add_route('get_media_reviews', '/api/media/{media_id}/reviews')
    config.add_route('get_user_reviews', '/api/user/reviews')