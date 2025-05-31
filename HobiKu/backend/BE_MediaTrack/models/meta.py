from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


def get_engine(url):
    return create_engine(url)

def get_session_factory(engine):
    return sessionmaker(bind=engine)

def get_tm_session(session_factory):
    return session_factory()