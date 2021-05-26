from flask import Blueprint, request
from app.models import db, Pantry, Ingredient, User
from flask_login import current_user, login_required
from app.forms import PantryForm
from app.forms import IngredientsIntoPantryForm
from ast import literal_eval
# import json

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
# @login_required
def user_pantries():
    user = User.query.filter(User.id == current_user.id).first()
    pantries = user.pantries

    return {
        'user': current_user.id,
        'username': current_user.username,
        'all_pantries': {pantry.id: pantry.to_dict() for pantry in pantries}
    }


@pantry_routes.route('/delete/<int:pantryId>', methods=['DELETE'])
# @login_required
def delete_pantry(pantryId):
    # pantry = Pantry.query.filter(pantryId == Pantry.id).first()
    pantry = Pantry.query.get(pantryId)
    db.session.delete(pantry)
    db.session.commit()
    return {}


@pantry_routes.route('/<int:pantryId>', methods=['POST'])
# @login_required
def add_ingredients_to_pantry(pantryId):
    form = IngredientsIntoPantryForm()
    ingredients_form = form.data['ingredients']
    pantry = Pantry.query.filter(pantryId == Pantry.id).first()
    ingredientsString = request.form['ingredients']
    ingredients = ingredientsString.split(',')
    for eachIngredient in ingredients:
        ingred = Ingredient.query.filter_by(name=eachIngredient).first()
        db.session.execute(f"""insert into pantry_ingredients ("ingredientsId", "pantryId")
        values ({ingred.id}, {pantry.id});""")
    db.session.commit()
    return {
        "selected_pantry": pantry.to_dict()
    }
