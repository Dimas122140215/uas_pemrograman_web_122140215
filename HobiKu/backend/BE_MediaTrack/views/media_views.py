from pyramid.view import view_config
from pyramid.response import Response
import json
from ..services.media_service import add_media_to_user

@view_config(route_name='add_media', renderer='json', request_method='POST')
def add_media_view(request):
    user_id = 1  # For now — later get from JWT
    data = request.json_body

    try:
        result = add_media_to_user(request.dbsession, user_id, data)
        return result
    except ValueError as e:
        return Response(json.dumps({"error": str(e)}), content_type='application/json', status=400)