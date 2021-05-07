from flask import Blueprint, request
from app.models import db, Pantry, Ingredient, User
from flask_login import current_user, login_required
from app.forms import PantryForm

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


@pantry_routes.route('/ingredients')
@login_required
def user_pantries():
    user = User.query.filter(User.id == current_user.id).first()
    pantries = user.pantries

    return {
        'user': current_user.id,
        'username': current_user.username,
        'pantries': [pantry.to_dict() for pantry in user.pantries]
    }
