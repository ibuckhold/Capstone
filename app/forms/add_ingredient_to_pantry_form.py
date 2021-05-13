from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class IngredientsIntoPantryForm(FlaskForm):
    ingredients = StringField('ingredients', validators=[DataRequired()])
