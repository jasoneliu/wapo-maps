import os
from functools import wraps
from datadog import statsd
from flask import request


def track(function, is_response=True, is_route=False):
    # Decorator function that allows for simple metric tracking with Datadog

    def track_with(f):

        @wraps(f)
        def wrapper(*args, **kwargs):
            env = f"APPLICATION_NAME-env:{os.environ.get('NILE_ENV', 'local')}"

            args_tags = []
            if is_route:
                for k, v in request.args.items():
                    args_tags.append(f"{k}:{v}")

            statsd.increment('APPLICATION_NAME.{}.calls'.format(
                function), tags=[env] + args_tags)

            with statsd.timed('APPLICATION_NAME{}.response.time'.format(function), tags=[env] + args_tags):
                data = f(*args, **kwargs)
            # Data should usually be a `flask.Response` object, but this makes that more flexible
            if hasattr(data, 'status_code') and is_response:
                statsd.increment('APPLICATION_NAME.{}.response.{}'.format(
                    function, data.status_code), tags=[env] + args_tags)

            return data

        return wrapper

    return track_with
