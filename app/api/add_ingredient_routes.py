from flask import Blueprint
from app.models import db, Ingredient, User
from flask_login import current_user, login_required
from app.forms import IngredientForm


ingredient_routes = Blueprint("owned", __name__)


@ingredient_routes.route('', methods=['POST'])
@login_required
def add_ingredient():
    form = IngredientForm()
    # if form.validate_on_submit():
    new_ingredient = Ingredient(name=form.data['name'])
    db.session.add(new_ingredient)
    db.session.commit()
    return {
        "id": new_ingredient.id,
        'name': new_ingredient.name,
    }


@ingredient_routes.route('')
@login_required
def get_all_ingredients():
    ingredients = Ingredient.query.all()
    return {'ingredients': [i.to_dict() for i in ingredients]}


@ingredient_routes.route('/pantryIngredients')
@login_required
def pantry_ingredients():
    user = User.query.filter(User.id == current_user.id).first()

    return {

    }
