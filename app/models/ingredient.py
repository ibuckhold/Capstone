from .db import db

pantry_ingredients = db.Table(
    'pantry_ingredients',
    db.Column('ingredientsId', db.Integer, db.ForeignKey('ingredients.id')),
    db.Column('pantryId', db.Integer, db.ForeignKey('pantries.id'))
)

recipe_ingredients = db.Table(
    'recipe_ingredients',
    db.Column('ingredientsId', db.Integer, db.ForeignKey('ingredients.id')),
    db.Column('recipeId', db.Integer, db.ForeignKey('recipies.id'))
)


class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }


# index_name = db.Index('index_name', Ingredient.name)
