import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getIngredients } from '../../store/ingredient';

function IngredientsInPantry() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [ingredients, setIngredients] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getIngredients())
      setIngredients()
    })();
  }, [dispatch])

  return (
    <div>

    </div>
  )
}