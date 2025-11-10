# src/admin_views.py

from flask import redirect, url_for
from flask_admin.contrib.sqla import ModelView
from flask_login import current_user

from src.extensions import db, admin
from src.models import User, Favorite


class AuthenticatedModelView(ModelView):
    """Ensures that only authenticated admins can see these views."""

    def is_accessible(self):
        return current_user.is_authenticated and current_user.is_admin

    def _handle_view(self, name, **kwargs):
        """Redirect non-admins to the login page."""
        if not self.is_accessible():
            return redirect(url_for('auth.login'))


class UserAdminView(AuthenticatedModelView):
    column_list = ('username', 'email', 'is_admin', 'subscription_status')
    form_columns = ('username', 'email', 'is_admin', 'subscription_status', 'notifications_enabled')


class FavoriteAdminView(AuthenticatedModelView):
    column_list = ('author', 'channel', 'keywords')
    form_columns = ('author', 'channel', 'keywords')


# Register views
admin.add_view(UserAdminView(User, db.session))
admin.add_view(FavoriteAdminView(Favorite, db.session))
