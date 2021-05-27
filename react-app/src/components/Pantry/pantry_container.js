import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { showPantries } from '../../store/pantry';
import { getIngredients } from '../../store/ingredient';
import { updatePantry, grabActivePantry, deletePantry } from '../../store/pantry';
import './pantry.css';


export const Pantries = () => {
  const dispatch = useDispatch();
  const [pantry, setPantry] = useState('');
  const [loaded, setLoaded] = useState(false);
  const pantries = useSelector(state => Object.values(state.pantries.all_pantries));

  useEffect(() => {
    dispatch(showPantries())
    dispatch(getIngredients())
  }, [dispatch])

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
    await dispatch(showPantries())
  }

  const deleteTheSelectedPantry = async (pantryId) => {
    await dispatch(deletePantry(pantryId));
    dispatch(showPantries())
  }

  const updatePantry = (e) => {
    setPantry(e.target.value);
  }

  return (
    <div>
      <div>
        <form className='createPantry' onSubmit={handleSubmit}>
          <input
            className='input'
            type='text'
            onChange={updatePantry}
            value={pantry}
            placeholder={'Pantry Category'}
          />
          <button className='input' type="submit">Create Pantry</button>
        </form>
      </div>
      <div className='myPantries'>
        {pantries.map((pantry, index) => (
          <div key={pantry.id}>
            <div className='pantryLink' onClick={() => dispatch(grabActivePantry(pantries[index]))}>{pantry.category}</div>
            <button onClick={() => deleteTheSelectedPantry(pantry.id)}> x </button>
          </div>
        ))}
      </div>
      <Pantry />
    </div>
  )
}

const Pantry = () => {
  const dispatch = useDispatch();
  const ingredientsObj = useSelector(state => state.ingredients, Object.deepEq);
  const ingredients = Object.values(ingredientsObj);
  const [ingredientName, setIngredientName] = useState('');
  const [matchedIngredient, setMatchedIngredient] = useState([]);
  const [cart, setCart] = useState([]);
  const [ingsInPantry, setIngsInPantry] = useState([]);
  const pantry = useSelector(state => state.pantries.selected_pantry);

  const updateIngredient = (e) => {
    const query = e.target.value.toUpperCase();
    setIngredientName(query);
    const matches = ingredients.filter(i => i.name.toUpperCase().includes(query));
    setMatchedIngredient(matches);
  }

  const addIngredient = (e) => {
    e.preventDefault();
    if (cart.indexOf(e.target.textContent) === -1) {
      setCart([...cart, e.target.textContent]);
    }
    setIngredientName('');
    setMatchedIngredient([]);
  }

  const addIngredientToPantry = async (e) => {
    e.preventDefault();
    let validatedCart = [];
    cart.forEach(el => {
      if (!ingsInPantry.includes(el)) {

      }
    });
    const formData = new FormData();
    formData.append('ingredients', cart);
    formData.append('pantryId', pantry.id);
    dispatch(updatePantry(pantry.id, formData));
    setIngsInPantry((oldPantryIng) => [...oldPantryIng, ...cart]);
    setIngredientName('');
    setMatchedIngredient([]);
    setCart([]);
  }

  useEffect(async () => {
    pantry && setIngsInPantry(pantry.ingredients);
  }, [pantry])

  return (pantry && (
    <div>
      <div className='selectorArea'>
        <button className='createIngBtn'>
          <NavLink to='/ingredient/add'>Create An Ingredient</NavLink>
        </button>
        <div className='pantryArea'>
          <form onSubmit={addIngredientToPantry}>
            <input
              type='text'
              value={ingredientName}
              placeholder='Add Ingredient to Pantry'
              onChange={updateIngredient}
            ></input>
            <div>
              {matchedIngredient.map((match) => (
                <div key={match.id} className='searchRes' onClick={addIngredient}>{match.name}</div>
              ))}
            </div>
            <button className='updatePantryButton' type="submit" >Update Pantry</button>
          </form>
          <div className='chosenPantries'>Ingredients in {pantry.category}
            <div>
              {ingsInPantry && ingsInPantry.map((ingredient) => (
                <div key={ingredient.id} className='eachIng eachRecipe'>{ingredient.name}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='cartIngredients'>
        <h1 className='cartLink'>Cart</h1>
        {cart?.map((item, index) => (
          <div key={index} className='eachItem'>{item}</div>
        ))}
      </div>
    </div>
  )) || <div className='noActive'>No Active Pantry</div>
}
