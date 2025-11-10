# src/models.py

from src.extensions import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    notifications_enabled = db.Column(db.Boolean, nullable=False, default=True)
    
    # Stripe fields
    stripe_customer_id = db.Column(db.String(120), unique=True)
    subscription_status = db.Column(db.String(50), default='inactive')
    subscription_end_date = db.Column(db.DateTime)

    favorites = db.relationship('Favorite', backref='author', lazy=True, cascade="all, delete-orphan")

    @property
    def is_premium(self):
        return self.subscription_status == 'active'

class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    channel = db.Column(db.String(100), nullable=False)
    keywords = db.Column(db.String(200), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
