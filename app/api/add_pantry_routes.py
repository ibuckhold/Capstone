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
        'all_pantries': [pantry.to_dict() for pantry in pantries]
    }

# @pantry_routes.route('/pantryIngredients')
# # @login_required
# def user_pantry_ingredients():
#     user = User.query.filter(User.id == current_user.id).first()
#     pantries = user.pantries
#     print('-----pantries', pantries)
#     # return [pantry.to_dict() for pantry in pantries]
#     return {
#         "pantry_ing": [pantry.to_dict() for pantry in pantries]
#     }


@pantry_routes.route('/<int:pantryId>', methods=['POST'])
# @login_required
def add_ingredients_to_pantry(pantryId):
    # user = User.query.filter(User.id == current_user.id).first()
    # parsed_data = json.loads(ingredients_form)
    # print('4==================================>', parsed_data)
    # # run this bad boy and lets seee...
    # print('2-------------------------->', ingredients)
    # ingredients.append(Ingredient.query.get(ingredient))

    # newDrink = Drink(authorId=newAuthorId, name=newName, isAlcoholic=newIsAlcoholic,
    #                  instructions=newInstructions, photo_url=newPhoto_url)

    # db.session.add(newDrink)
    # db.session.commit()
    # print(ingredients)
    form = IngredientsIntoPantryForm()
    ingredients_form = form.data['ingredients']
    print('========form', ingredients_form)
    pantry = Pantry.query.filter(pantryId == Pantry.id).first()
    # ingredients = ingredients_form.split('--*--')
    ingredientsString = request.form['ingredients']
    # ingredients = literal_eval(ingredients_form)
    # ingredients = json.loads(form.data['ingredients'])
    ingredients = ingredientsString.split(',')
    print('===========>ingredddds', ingredients)
    for eachIngredient in ingredients:
        print('-----splittingArray--', eachIngredient)
        ingred = Ingredient.query.filter_by(name=eachIngredient).first()
        db.session.execute(f"""insert into pantry_ingredients ("ingredientsId", "pantryId")
        values ({ingred.id}, {pantry.id});""")
        # BACK POPULATES CHECK IT OUT
        # filteredIng = Ingredient.query.filter_by(name=eachIngredient)
        # print('llll----00000FILTERING', filteredIng)
        # pantry.ingredients.append(filteredIng)
        # db.session.add()
    # for i in eachIngredient:
    #     print('000000', pantry, i)
    db.session.commit()
    return {
        "selected_pantry": pantry.to_dict()
    }
