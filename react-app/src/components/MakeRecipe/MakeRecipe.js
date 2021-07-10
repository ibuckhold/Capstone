import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createRecipe } from '../../store/recipe';
import './makeRecipe.css';

export const MakeRecipe = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [recipeUsername, setRecipeUsername] = useState('');
  const [instructions, setInstructions] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  const submitRecipe = async (e) => {
    e.preventDefault();
    await dispatch(createRecipe(recipeUsername, instructions, estimatedTime));
    history.push('/home');
    // setRecipeUsername('');
    // setInstructions('');
    // setEstimatedTime('');
    // await dispatch(getAllRecipes());
  }

  const updateRecipe = async (e) => {
    setRecipeUsername(e.target.value);
  }
  const updateInstructions = async (e) => {
    setInstructions(e.target.value);
  }
  const updateEstimatedTime = async (e) => {
    setEstimatedTime(e.target.value);
  }

  return (
    <>
      <div className='recipeForm form'>
        <form onSubmit={submitRecipe}>
          <div>
            <label>Recipe Name</label>
            <input
              type="text"
              name="recipeName"
              onChange={updateRecipe}
              value={recipeUsername}
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
    </>
  )
}