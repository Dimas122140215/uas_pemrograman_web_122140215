# backend/hobiku_api/routes.py
def init_routes(config):
    config.add_route('register', '/api/auth/register')