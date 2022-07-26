import os
from werkzeug.security import check_password_hash


def verify_password(username, password):
    if username == os.environ.get('APP_USER'):
        return check_password_hash(os.environ.get('APP_PW_HASH'), password)
    else:
        return False
