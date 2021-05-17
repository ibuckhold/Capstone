import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { showPantries } from '../../store/pantry';
// import { getIngredients } from '../../store/ingredient';
import { addingIngredient, getIngredients } from '../../store/ingredient';
import { updatePantry } from '../../store/pantry';
import './pantry.css';


export const Pantries = () => {
  const dispatch = useDispatch();
  const [activePantry, setActivePantry] = useState(false);
  const [pantry, setPantry] = useState('');
  const [loaded, setLoaded] = useState(false);
  const pantriesArr = useSelector(state => Object.values(state.pantries));
  const pantries = pantriesArr.map((pantry) => {
    return pantry
  })


  useEffect(() => {
    (async () => {
      await dispatch(showPantries())
      await dispatch(getIngredients())
    })();
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
        {pantries[0]?.map((pantry, index) => (
          <div key={pantry.id} className='pantryLink' onClick={() => setActivePantry(pantries[0][index])}>
            {pantry.category}
          </div>
        ))}
      </div>
      <Pantry pantry={activePantry} />
    </div>
  )
}

const Pantry = ({ pantry }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(state => Object.values(state.ingredients));
  const [ingredientName, setIngredientName] = useState('');
  const [matchedIngredient, setMatchedIngredient] = useState([]);
  const [cart, setCart] = useState([]);

  const updateIngredient = (e) => {
    const query = e.target.value.toUpperCase();
    setIngredientName(query);
    const matches = ingredients.filter(i => i.name.toUpperCase().includes(query));
    setMatchedIngredient(matches);
  }

  // const ingredientMaker = (e) => {
  //   const input = e.target.value;
  //   setIngredientName(input);
  //   addIngredient(input)
  // }

  const addIngredient = (e) => {
    e.preventDefault();
    setCart([...cart, e.target.textContent]);
    console.log('cart', cart);
  }

  // const createIngredient = (e) => {
  //   e.preventDefault();
  //   dispatch(addingIngredient(e.target.textContent));
  //   setCart([...cart, e.target.textContent]);
  //   console.log('addingcart', cart);
  // }

  const addIngredientToPantry = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('ingredients', cart)
    formData.append('pantryId', pantry.id)
    dispatch(updatePantry(pantry.id, formData))
    // dispatch(updatePantry(pantry.id, cart));
    // console.log('endcart', cart);
    console.log('endcart', formData);
  }

  return pantry ? (
    <div>
      <NavLink className='navlink' to='/ingredient/add'>Create An Ingredient</NavLink>
      <div className='selectorArea'>
        <div className='pantryArea'>
          <div className='chosenPantries'>
            Ingredients in {pantry.category}
          </div>
          <form onSubmit={addIngredientToPantry}>
            <input
              type='text'
              value={ingredientName}
              onChange={updateIngredient}
            ></input>
            <div>
              {matchedIngredient.map((match) => (
                //button next to div 
                <select onClick={addIngredient}>{match.name}</select>
              ))}
            </div>
            <button type="submit" >Update Pantry</button>
          </form>
        </div>
      </div>
      <div className='cartIngredients'>
        <h1>Cart</h1>
        {cart?.map((item) => (
          <div>{item}</div>
        ))}
      </div>
    </div>
  ) : <div>No Active Pantry</div>
}