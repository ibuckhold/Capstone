from flask import Blueprint, request
from app.models import db, Pantry, Ingredient, User
from flask_login import current_user, login_required
from app.forms import PantryForm
from app.forms import IngredientsIntoPantryForm
from ast import literal_eval
import json

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
        'pantries': [pantry.to_dict() for pantry in user.pantries]
    }


@pantry_routes.route('/<int:pantryId>', methods=['POST'])
# @login_required
def add_ingredients_to_pantry(pantryId):
    form = IngredientsIntoPantryForm()
    user = User.query.filter(User.id == current_user.id).first()
    ingredients_form = form.data['ingredients']
    # print('8==================================>',
    #       literal_eval(ingredients_form))
    ingredients = literal_eval(ingredients_form)
    # ingredients = ingredients_form.split('--*--')
    print('8==================================>', ingredients)
    # parsed_data = json.loads(ingredients_form)
    # print('4==================================>', parsed_data)
    # # run this bad boy and lets seee...
    # ingredients = json.loads(form.data['ingredients'])
    # print('2-------------------------->', ingredients)
    eachIngredient = Ingredient.query.filter(
        Ingredient.name.in_(ingredients)).all()
    pantry = Pantry.query.filter(pantryId == Pantry.id).first()
    for i in eachIngredient:
        pantry.ingredients.append(i)
    return {
        "pantry": pantry.to_dict()
    }
