# src/extensions.py

from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_admin import Admin
from flask_mail import Mail
from flask_migrate import Migrate
from flask_caching import Cache
# from celery import Celery
import os

# --- Extensions Initialization ---
db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = 'auth.login'
mail = Mail()
admin = Admin(name='Hybrid Agent Admin')
migrate = Migrate()
cache = Cache()

# --- Celery Config ---
# The broker URL is taken from environment variables
# celery = Celery(__name__, broker=os.environ.get('CELERY_BROKER_URL', 'redis://localhost:6379/0'))
