from src import create_app
from src.extensions import db, admin
from src.admin_views import register_admin_views
from src.routes import main_bp
from src.auth import auth_bp

# Create the Flask app instance
app = create_app()

# Within the application context...
with app.app_context():
    # 1. Create all database tables (if they don't exist)
    db.create_all()
    # 2. Register the admin views
    register_admin_views(admin, db.session)

# Register the blueprints
app.register_blueprint(main_bp)
app.register_blueprint(auth_bp, url_prefix='/auth')

# The 'app' instance is what Vercel will use
