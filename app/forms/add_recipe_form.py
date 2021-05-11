from flask_wtf import FlaskForm
from wtforms import StringField, TextField
from wtforms.validators import DataRequired

class RecipeForm(FlaskForm):
  recipeName = StringField('recipeName', validators=[DataRequired()])
  instructions = TextField('instructions', validators=[DataRequired()])
  estimatedTime = StringField('estimatedTime', validators=[DataRequired()])