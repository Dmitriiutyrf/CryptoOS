from src import create_app
from src.routes import main_bp
from src.auth import auth_bp

app = create_app()

app.register_blueprint(main_bp)
app.register_blueprint(auth_bp, url_prefix='/auth')
