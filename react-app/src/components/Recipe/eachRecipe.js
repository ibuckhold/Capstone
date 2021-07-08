import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteRecipe, getSelectedRecipe } from '../../store/recipe';
import './recipe.css';

export const SpecificRecipe = () => {
  const dispatch = useDispatch();
  const recipe = useSelector(state => state.recipes.specificRecipe)
  let { recipeId } = useParams();

  useEffect(() => {
    dispatch(getSelectedRecipe(recipeId))
  }, [dispatch])

  return (
    <div className='feed'>
      <div className='selectedRecipe'>
        <div className='recName'>
          <div >{recipe?.recipeName}</div>
        </div>
        <div className='estTime'>
          <div>{recipe?.estimatedTime}</div>
        </div>
        <div className='estTime'>
          <div>{recipe?.instructions}</div>
        </div>
      </div>
    </div>
  )
}