from .db import db


class Pantry(db.Model):
    __tablename__ = 'pantries'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), unique=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='pantries')
    ingredients = db.relationship(
        'Ingredient', backref='pantries', secondary='pantry_ingredients'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            "userId": self.userId,
            "ingredients": [i.to_dict() for i in self.ingredients]
        }
