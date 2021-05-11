import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../../store/recipe';

export const CreateRecipe = () => {
  const dispatch = useDispatch();
  const [recipeName, setRecipeName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  const submitRecipe = async (e) => {
    e.preventDefault();
    await dispatch(createRecipe(recipeName, instructions, estimatedTime));
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

  return (
    <div>
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
          <label>Instructions</label>
          <input
            type="text"
            name="instructions"
            onChange={updateInstructions}
            value={instructions}
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
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  )

}