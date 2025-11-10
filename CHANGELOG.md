# CHANGELOG

## Version 0.2.0

feature - Implemented a secure admin dashboard using Flask-Admin. Administrators can now manage Users and Favorite channels through a dedicated UI.

feature - Created custom, authenticated model views for the admin panel to ensure only authorized administrators can access it.

fixed - Resolved a critical circular import error by refactoring the project structure. Admin-related views were moved into a new `src/admin_views.py` module, breaking the import cycle with `src/__init__.py`.
