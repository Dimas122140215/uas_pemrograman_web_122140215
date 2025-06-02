from pyramid.config import Configurator
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, configure_mappers
import zope.sqlalchemy

from .models import Base

def get_session_factory(url):
    """Create database session factory"""
    engine = create_engine(url, echo=True)  # Set echo=False in production
    session_factory = sessionmaker()
    session_factory.configure(bind=engine)
    return session_factory

def get_tm_session(session_factory, transaction_manager):
    """Get transaction-managed session"""
    dbsession = session_factory()
    zope.sqlalchemy.register(
        dbsession, transaction_manager=transaction_manager)
    return dbsession

def main(global_config, **settings):
    """Main WSGI application factory"""
    config = Configurator(settings=settings)
    
    # Database configuration
    session_factory = get_session_factory(settings['sqlalchemy.url'])
    config.registry['dbsession_factory'] = session_factory
    
    # Make sure all mappers are configured
    configure_mappers()
    
    # Add request method for database session
    def get_dbsession(request):
        return get_tm_session(
            request.registry['dbsession_factory'],
            request.tm
        )
    
    config.add_request_method(get_dbsession, 'dbsession', reify=True)
    
    # Include transaction management - this must come before scanning views
    config.include('pyramid_tm')
    
    # Include routes
    config.include('.routes')
    
    # Scan for views
    config.scan('.views.auth_views')
    config.scan('.views.media_views')  # This should now work
    
    return config.make_wsgi_app()