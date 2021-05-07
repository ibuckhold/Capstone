# from .db import db


# class Recipe(db.Model):
#     __tablename__ = 'recipies'

#     id = db.Column(db.Integer, primary_key=True)
#     recipeName = db.Column(db.String(50), unique=True, nullable=False)
#     userId = db.Column(db.Integer, db.ForeignKey('users.id'))
#     instructions = db.Column(db.Text, nullable=False)
#     estimatedTime = db.Column(db.String(50), nullable=False)
