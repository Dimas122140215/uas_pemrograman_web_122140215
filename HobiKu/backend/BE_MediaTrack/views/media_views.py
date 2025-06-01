# backend/hobiku_api/views/media_views.py
from pyramid.view import view_config
from pyramid.response import Response
import json

from ..services.media_service import update_media_tracking, delete_media_from_tracker

@view_config(route_name='update_media', renderer='json', request_method='PUT')
def update_media_view(request):
    user_id = 1  # Later: get from JWT token
    media_id = int(request.matchdict['id'])
    data = request.json_body

    try:
        result = update_media_tracking(request.dbsession, user_id, media_id, data)
        return result
    except ValueError as e:
        return Response(
            body=json.dumps({"error": str(e)}),
            content_type='application/json',
            charset='utf-8',
            status=400
        )
    except Exception as e:
        return Response(
            body=json.dumps({"error": "An unexpected error occurred"}),
            content_type='application/json',
            charset='utf-8',
            status=500
        )


@view_config(route_name='delete_media', renderer='json', request_method='DELETE')
def delete_media_view(request):
    user_id = 1  # Later: get from JWT token
    media_id = int(request.matchdict['id'])

    try:
        result = delete_media_from_tracker(request.dbsession, media_id, user_id)
        return result
    except ValueError as e:
        return Response(
            body=json.dumps({"error": str(e)}),
            content_type='application/json',
            charset='utf-8',
            status=400
        )
    except Exception as e:
        return Response(
            body=json.dumps({"error": "An unexpected error occurred"}),
            content_type='application/json',
            charset='utf-8',
            status=500
        )