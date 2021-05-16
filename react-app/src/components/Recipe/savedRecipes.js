import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getMyRecipes } from '../../store/recipe';
import './recipe.css';

export const SavedRecipes = () => {
  const dispatch = useDispatch();
  const myRecipes = useSelector(state => state.recipes.myRecipes?.reverse());

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
            <div className='eachRecipe' key={recipe.id}>
              <div className='recName'>{recipe.recipeName}</div>
              <div className='estTime'>{recipe.estimatedTime}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}