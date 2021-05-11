import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { showPantries } from '../../store/pantry';
import './pantry.css';

const CreatePantry = () => {
  const dispatch = useDispatch();
  const [pantry, setPantry] = useState('');
  const [loaded, setLoaded] = useState(false);
  const pantries = useSelector(state => state?.pantryReducer?.pantries)
  // console.log('pantries---------->', pantries)

  useEffect(() => {
    (async () => {
      await dispatch(showPantries())
    })();
  }, [dispatch])

  useEffect(async () => {
    if (!loaded) {
      return
    }
    await dispatch(showPantries())
    renderPantries();
    setLoaded(false);
  }, [dispatch, loaded])

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

  const renderPantries = () => {
    return (
      <div>
        {pantries.map((pantry) => {
          return (
            <NavLink className='pantryLink' key={pantry.id} to={`/pantry/${pantry.id}`}>
              {pantry.category}
            </NavLink>
          )
        })}
      </div>
    )
  }

  if (!pantries) {
    return null
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
      <div className='myPantries'>
        {renderPantries()}
      </div>
    </main>
  )
}

export default CreatePantry