import logging.config
import sys

from flask import Flask
from datadog import initialize

from api.config import conf

app = Flask(__name__)
app.config.from_object(conf)
app.logger.addHandler(logging.StreamHandler(sys.stdout))

# If it's in debug mode, wrap the results
if app.debug:
    from werkzeug.debug import DebuggedApplication
    app.wsgi_app = DebuggedApplication(app.wsgi_app, True)

if app.config['DATADOG_ENABLED']:
    initialize(statsd_host='statsd', statsd_port=8125)

if app.config['DEBUG']:
    app.logger.setLevel(logging.DEBUG)


import api.api  # noqa @NoMove @IgnorePep8
