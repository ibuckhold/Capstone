from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class PantryForm(FlaskForm):
    category = StringField('category', validators=[DataRequired()])
