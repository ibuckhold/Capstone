const GET_PANTRIES = 'GET_PANTRIES';
const ADD_TO_PANTRY = "ADD_TO_PANTRY";
// const GET_PANTRY_ING = "GET_PANTRY_ING"

const getPantries = (pantries) => ({
  type: GET_PANTRIES,
  payload: pantries
})

const addToPantry = (ingredients) => ({
  type: ADD_TO_PANTRY,
  payload: ingredients
})

// const getIngredients = (ingredients) => ({
//   type: GET_PANTRY_ING,
//   payload: ingredients
// })

export const showPantries = () => async (dispatch) => {
  const res = await fetch('/api/pantry/ingredients');
  const data = await res.json();
  if (res.ok) {
    await dispatch(getPantries(data));
  } else {
    throw res;
  }
}

export const getPantryIngredients = () => async (dispatch) => {
  const res = await fetch('/api/pantry/ingredients');
  const data = await res.json();
  if (res.ok) {
    await dispatch(getPantries(data))
  }
}

export const updatePantry = (pantryId, formData) => async (dispatch) => {
  const res = await fetch(`/api/pantry/${pantryId}`, {
    method: "POST",
    body: formData
  })
  const data = await res.json();
  if (res.ok) {
    await dispatch(addToPantry(data));
  } else {
    console.log('ERRRRRRRRRORRRRRRR')
  }
}

const initialState = {};

export default function pantryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PANTRIES:
      const newState = { ...state, ...action.payload };
      return newState;
    case ADD_TO_PANTRY:
      return { ...state, ...action.payload };
    // case GET_PANTRY_ING:
    //   return { ...state, ...action.payload };
    default:
      return state
  }
}