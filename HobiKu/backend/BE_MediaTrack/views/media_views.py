from pyramid.view import view_config
from pyramid.response import Response
from ..security import get_user_id_from_request
from marshmallow.exceptions import ValidationError
import json

@view_config(route_name='get_tracked_media', renderer='json', request_method='GET')
def get_tracked_media_view(request):
    try:
        user_id = get_user_id_from_request(request)
        media_type = request.matchdict['type']

        # Later, fetch from DB using SQLAlchemy
        return {
            "user_id": user_id,
            "media_type": media_type,
            "tracked": []
        }

    except ValidationError as ve:
        return Response(json.dumps({"error": ve.messages}), status=400, content_type='application/json', charset='utf-8')