import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe, getAllRecipes } from '../../store/recipe';
import './recipe.css';

export const CreateRecipe = () => {
  const dispatch = useDispatch();
  const [recipeName, setRecipeName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const recipes = useSelector(state => state.recipes.recipes?.reverse());

  const submitRecipe = async (e) => {
    e.preventDefault();
    await dispatch(createRecipe(recipeName, instructions, estimatedTime));
    setRecipeName('');
    setInstructions('');
    setEstimatedTime('');
  }

  const updateRecipe = async (e) => {
    setRecipeName(e.target.value);
  }
  const updateInstructions = async (e) => {
    setInstructions(e.target.value);
  }
  const updateEstimatedTime = async (e) => {
    setEstimatedTime(e.target.value);
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllRecipes(recipes))
    })();
  }, [dispatch]);

  return (
    <div>
      <div className='recipeForm form'>
        <form onSubmit={submitRecipe}>
          <div>
            <label>Recipe Name</label>
            <input
              type="text"
              name="recipeName"
              onChange={updateRecipe}
              value={recipeName}
            ></input>
          </div>
          <div>
            <label>Estimated Time</label>
            <input
              type="text"
              name="estimatedTime"
              onChange={updateEstimatedTime}
              value={estimatedTime}
            ></input>
          </div>
          <div>
            <label>Instructions</label>
            <textarea
              type="text"
              name="instructions"
              onChange={updateInstructions}
              value={instructions}
            ></textarea>
          </div>
          <button type="submit">Create Recipe</button>
        </form>
      </div>
      <div className='feed'>
        <div>
          <h1 className='head'>Recipe Feed</h1>
          {recipes?.map((recipe) => (
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