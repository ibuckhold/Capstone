import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getMyRecipes } from '../../store/recipe';

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
      <div>
        <div>
          {myRecipes?.map((recipe) => (
            <div key={recipe.id}>{recipe.recipeName}</div>
          ))}
        </div>
      </div>
    </div>
  )
}