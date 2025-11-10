# src/__init__.py

import os
from flask import Flask
from src.extensions import db, bcrypt, login_manager, admin, migrate
from src.models import User
# DO NOT import register_admin_views here, it will be used in index.py

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    # --- Configuration ---
    db_path = '/tmp/site.db'
    app.config.from_mapping(
        SECRET_KEY=os.environ.get('SECRET_KEY', 'a-very-secret-key'),
        SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL', f'sqlite:///{db_path}'),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        WTF_CSRF_SECRET_KEY=os.environ.get('WTF_CSRF_SECRET_KEY', 'another-secret-key')
    )

    # --- Initialize Extensions ---
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    admin.init_app(app)
    migrate.init_app(app, db)

    # --- User Loader ---
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    return app
