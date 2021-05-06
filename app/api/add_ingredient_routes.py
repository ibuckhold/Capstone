from flask import Blueprint
from app.models import db, Ingredient
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
        'name': new_ingredient.name,
    }
    # return 'ERRRRRRORRRR'
