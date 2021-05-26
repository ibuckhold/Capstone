import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../store/ingredient";

const CreateIngredient = () => {
  const dispatch = useDispatch();
  const [ingredient, setIngredient] = useState('');
  const allIngredients = useSelector(state => Object.values(state.ingredients).reverse());

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await dispatch(setIngredient(ingredient));
    const formData = new FormData();
    formData.append('name', ingredient);

    const res = await fetch('/api/ingredients/add', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      await res.json();
    }
    setIngredient('');
  }



  const updateIngredient = (e) => {
    setIngredient(e.target.value);
  }


  return (
    <main>
      <div>
        <div>
          <h1>Create an Ingredient!</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              onChange={updateIngredient}
              value={ingredient}
              placeholder={'Ingredient Name'}
            />
            <button type="submit">Create Ingredient</button>
          </form>
        </div>
      </div>
      <div>
        <div>
          {allIngredients.map((ing) => (
            <div className='eachRecipe'>{ing.name}</div>
          ))}
        </div>
      </div>
    </main>
  )

}

export default CreateIngredient;
