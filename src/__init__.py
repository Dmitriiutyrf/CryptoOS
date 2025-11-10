# src/__init__.py

import os
from flask import Flask
from src.extensions import db, bcrypt, login_manager, admin, migrate
from src.models import User

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    # --- Configuration ---
    # Use /tmp for Vercel's writable directory
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

    with app.app_context():
        # --- Model & Admin View Registration ---
        import src.models
        import src.admin_views

        # In a serverless environment like Vercel, we can't run 'flask db upgrade'.
        # Instead, we check if the database file exists in the writable /tmp directory
        # and create all tables if it doesn't. This is a "cold start" initialization.
        if not os.path.exists(db_path):
            db.create_all()

    return app
