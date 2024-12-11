from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.exceptions import ValidationError as DRFValidationError

def custom_exception_handler(exc, context):
    """
    Custom exception handler for better error responses.
    """
    if isinstance(exc, DjangoValidationError):
        exc = DRFValidationError(detail=exc.messages)

    response = exception_handler(exc, context)
    
    if response is None:
        if isinstance(exc, Exception):
            data = {
                'error': True,
                'message': str(exc),
                'details': None
            }
            return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return None

    if isinstance(exc, DRFValidationError):
        response.data = {
            'error': True,
            'message': 'Validation error',
            'details': response.data
        }
    else:
        response.data = {
            'error': True,
            'message': str(exc),
            'details': response.data if hasattr(response, 'data') else None
        }

    return response
