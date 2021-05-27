import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getMyRecipes, deleteRecipe } from '../../store/recipe';
import './recipe.css';

export const SavedRecipes = () => {
  const dispatch = useDispatch();
  const myRecipes = useSelector(state => state.recipes.myRecipes?.reverse());

  const deleteTheRecipe = async (recipeId) => {
    await dispatch(deleteRecipe(recipeId));
    dispatch(getMyRecipes());
  }

  useEffect(() => {
    (async () => {
      await dispatch(getMyRecipes())
    })();
  }, [dispatch]);

  return (
    <div>
      <div className="heading">
        <h1 className="title">Your Saved Recipes</h1>
      </div>
      <div className='feed'>
        <div>
          {myRecipes?.map((recipe) => (
            <NavLink to={`/recipe/${recipe.id}`}>
              <div className='eachRecipe' key={recipe.id}>
                <div className='recName'>{recipe.recipeName}</div>
                <div className='estTime'>{recipe.estimatedTime}</div>
              </div>
              <button onClick={() => deleteTheRecipe(recipe.id)}> x </button>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}
