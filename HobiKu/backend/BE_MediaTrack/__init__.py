# backend/hobiku_api/__init__.py
from pyramid.config import Configurator
from .models.user import Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

def get_session_factory(url):
    engine = create_engine(url)
    Base.metadata.create_all(engine)
    return sessionmaker(bind=engine)

def get_tm_session(session_factory):
    return session_factory()

def main(global_config, **settings):
    config = Configurator(settings=settings)

    # Create DB session
    session_factory = get_session_factory(settings['sqlalchemy.url'])
    dbsession = get_tm_session(session_factory)

    # Add request method
    def get_dbsession(request):
        return dbsession

    config.add_request_method(get_dbsession, 'dbsession', reify=True)

    # Define routes
    config.add_route('register', '/api/auth/register')
    config.add_route('login', '/api/auth/login')
    config.add_route('add_media', '/api/media/{type}')

    # Scan views
    config.scan('.views.auth_views')
    config.scan('.views.media_views')

    return config.make_wsgi_app()