import logging
import os
import sys
from api import conf

logger = logging.getLogger()

if os.environ.get("FLASK_ENV") != "test":
    logger = logging.getLogger()
    logger.setLevel(getattr(logging, conf.LOG_LEVEL))
    handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter('%(asctime)s %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.info("Log Level: %s" % conf.LOG_LEVEL)
