from flask import Blueprint, request
from app.models import db, Recipe
from flask_login import current_user, login_required
from app.forms import RecipeForm

recipe_routes = Blueprint('recipe', __name__)

@recipe_routes.route('', methods=['POST'])
@login_required
def add_recipe():
  form = RecipeForm()
  new_recipe = Recipe(
    recipeName=form.data['recipeName'],
    userId=current_user.id, 
    instructions=form.data['instructions'], 
    estimatedTime=form.data['estimatedTime']
    )
  db.session.add(new_recipe)
  db.session.commit()
  return {
    "recipeName": new_recipe.recipeName,
    "userId": new_recipe.userId,
    "instructions": new_recipe.instructions,
    "estimatedTime": new_recipe.estimatedTime
  }