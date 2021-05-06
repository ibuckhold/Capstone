from flask import Blueprint
from app.models import db, Pantry
from flask_login import current_user, login_required
from app.forms import PantryForm
from flask_login import current_user

pantry_routes = Blueprint("kitchen", __name__)


@pantry_routes.route('', methods=['POST'])
@login_required
def add_pantry():
    form = PantryForm()
    new_pantry = Pantry(category=form.data['category'], userId=current_user.id)
    db.session.add(new_pantry)
    db.session.commit()
    return {
        'category': new_pantry.category
    }
