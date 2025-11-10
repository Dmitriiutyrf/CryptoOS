from src import create_app
from src.routes import main_bp
from src.auth import auth_bp

app = create_app()

app.register_blueprint(main_bp)
app.register_blueprint(auth_bp, url_prefix='/auth')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
