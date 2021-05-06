import React, { useState } from "react";

const CreatePantry = () => {
  const [pantry, setPantry] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', pantry);

    const res = await fetch('/api/pantry', {
      method: 'POST',
      body: formData
    })
    if (res.ok) {
      await res.json()
    }
    setPantry('')
  }

  const updatePantry = (e) => {
    setPantry(e.target.value);
  }

  return (
    <main>
      <div>
        <div>
          <h1>Create a Pantry!</h1>
        </div>
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
      </div>
    </main>
  )
}

export default CreatePantry