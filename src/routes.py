# src/routes.py

from flask import Blueprint, render_template, redirect, url_for, flash
from flask_login import login_required, current_user
# from src.forms import FavoriteForm
from src.models import Favorite
from src.extensions import db

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('main.dashboard'))
    return render_template('index.html')

@main_bp.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    # form = FavoriteForm()
    # if form.validate_on_submit():
    #     favorite = Favorite(name=form.name.data, user_id=current_user.id)
    #     db.session.add(favorite)
    #     db.session.commit()
    #     flash('Favorite added!', 'success')
    #     return redirect(url_for('main.dashboard'))
    # favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    return render_template('dashboard.html')
