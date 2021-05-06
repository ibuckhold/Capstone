from .db import db


class Pantry(db.Model):
    __tablename__ = 'pantries'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), unique=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='pantry')
    # ingredientId = db.relationship('Ingredient', back_populates='')

    def to_dict(self):
        return {

        }
