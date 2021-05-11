import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import { showPantries } from '../../store/pantry';
// import { getIngredients } from '../../store/ingredient';
import './pantry.css';


export const Pantries = () => {
  const dispatch = useDispatch();
  const [activePantry, setActivePantry] = useState(false);
  const pantries = useSelector(state => Object.values(state.pantries.pantries));

  // useEffect(() => {
  //   (async () => {
  //      await dispatch(showPantries())
  //   })();
  // }, [dispatch])

  return (
    <div>
      <div className='myPantries'>
        {pantries?.map((pantry, index) => (
          <div className='pantryLink' onClick={() => setActivePantry(pantries[index])}>
            {pantry.category}
          </div>
        ))}
      </div>
      <Pantry pantry={activePantry} />
    </div>
  )
}

const Pantry = ({ pantry }) => {
  const ingredients = useSelector(state => Object.values(state.ingredients));
  const [ingredientName, setIngredientName] = useState('');
  const [matchedIngredient, setMatchedIngredient] = useState([]);

  const updateIngredient = (e) => {
    const query = e.target.value.toUpperCase();
    setIngredientName(query);
    const matches = ingredients.filter(i => i.name.toUpperCase().includes(query));
    setMatchedIngredient(matches);
  }

  return pantry ? (
    <div>
      <div className='selectorArea'>
        <div className='chosenPantries'>
          Ingredients in {pantry.category}
        </div>
        <input type='text' value={ingredientName} onChange={updateIngredient}></input>
        <div>
          {matchedIngredient.map((match) => (
            <div>{match.name}</div>
          ))}
        </div>
      </div>
    </div>
  ) : <div>No Active Pantry</div>
}