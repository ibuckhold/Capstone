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
  const [pantry, setPantry] = useState('');
  const [loaded, setLoaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', pantry);

    const res = await fetch('/api/pantry', {
      method: 'POST',
      body: formData
    })
    if (res.ok) {
      await res.json();
      setLoaded(true);
    }
    setPantry('');
  }

  const updatePantry = (e) => {
    setPantry(e.target.value);
  }

  // useEffect(() => {
  //   (async () => {
  //      await dispatch(showPantries())
  //   })();
  // }, [dispatch])

  return (
    <div className='pantriesPage'>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            onChange={updatePantry}
            value={pantry}
            placeholder={'Pantry Category'}
          />
          <button type="submit">Create Pantry</button>
        </form>
      </div>
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
  const [selectedArr, setSelectedArr] = useState([]);

  const updateIngredient = (e) => {
    const query = e.target.value.toUpperCase();
    setIngredientName(query);
    const matches = ingredients.filter(i => i.name.toUpperCase().includes(query));
    setMatchedIngredient(matches);
  }

  const addToSelectedPantry = (e) => {
    const selectedIngredient = e.target.value;
    selectedIngredient.push(selectedArr);

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
            <div >
              {match.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : <div>No Active Pantry</div>
}