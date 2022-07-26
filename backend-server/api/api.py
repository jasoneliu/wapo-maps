from flask import Response, jsonify, request
from flask_httpauth import HTTPBasicAuth
from api.common import logger, authenticate
import api.common.exceptions
from api.common.decorators import track

from api import app

auth = HTTPBasicAuth()


@auth.verify_password
def verify_password(username, password):
    return authenticate.verify_password(username, password)
