import os


class Config(object):
    DATADOG_ENABLED = os.environ.get('DATADOG_ENABLED')
    LOG_LEVEL = "WARNING"
    APP_ENVIRONMENT = f"APPLICATION_NAME-env:{os.environ.get('NILE_ENV', 'local')}"
    BASE_DATADOG_TAGS = [APP_ENVIRONMENT]


class DevConfig(Config):
    CONF_ENV = 'dev'
    LOG_LEVEL = "DEBUG"


class ProdConfig(Config):
    CONF_ENV = 'prod'


FLASK_ENV = os.environ.get("FLASK_ENV", "dev")
if FLASK_ENV in ["dev", "test"]:
    conf = DevConfig()
else:
    conf = ProdConfig()
