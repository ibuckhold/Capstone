import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
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
            <div>
              <div className='eachRecipe' key={recipe.id}>
                <div className='recName'>{recipe.recipeName}</div>
                <div className='estTime'>{recipe.estimatedTime}</div>
              </div>
              <button onClick={() => deleteTheRecipe(recipe.id)}> x </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
