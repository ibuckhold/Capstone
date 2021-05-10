import React, { useState } from "react";

const CreateIngredient = () => {
  const [ingredient, setIngredient] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await dispatch(setIngredient(ingredient));
    const formData = new FormData();
    formData.append('name', ingredient);

    const res = await fetch('/api/ingredient', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      await res.json()
    }
    setIngredient('')
  }

  // useEffect(() => {
  //   (async () => {
  //     await dispatch()
  //   })()
  // })


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
    </main>
  )

}

export default CreateIngredient;