const GET_PANTRIES = 'GET_PANTRIES';
const ADD_TO_PANTRY = "ADD_TO_PANTRY";

const getPantries = (pantries) => ({
  type: GET_PANTRIES,
  payload: pantries
})

const addToPantry = (ingredients) => ({
  type: ADD_TO_PANTRY,
  payload: ingredients
})

export const showPantries = () => async (dispatch) => {
  const res = await fetch('/api/pantry/ingredients');
  const data = await res.json();
  console.log('------>', data);
  if (res.ok) {
    await dispatch(getPantries(data));
  } else {
    console.log('response', data);
    throw res;
  }
}

export const updatePantry = (pantryId, ingredients) => async (dispatch) => {
  const ingredientsToSend = await [...ingredients].join('--**--')
  console.log('-----()', ingredientsToSend)
  const res = await fetch(`/api/pantry/${pantryId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: {
      ingredients: ingredientsToSend
    }
  })
  const data = await res.json();
  console.log('-----()', data);
  if (res.ok) {
    await dispatch(addToPantry(data));
  }
}

const initialState = {};

export default function pantryReducer(state = initialState, action) {
  const prevState = { ...state }
  switch (action.type) {
    case GET_PANTRIES:
      const newState = { ...state, ...action.payload };
      return newState;
    case ADD_TO_PANTRY:
      newState = { ...action.payload };
      return { ...state, ...action.payload };
    default:
      return state
  }
}