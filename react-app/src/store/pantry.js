const GET_PANTRIES = 'GET_PANTRIES';
const ADD_TO_PANTRY = "ADD_TO_PANTRY";
const GET_PANTRY_ING = "GET_PANTRY_ING"

const getPantries = (pantries) => ({
  type: GET_PANTRIES,
  payload: pantries
})

const addToPantry = (ingredients) => ({
  type: ADD_TO_PANTRY,
  payload: ingredients
})

const getIngredients = (ingredients) => ({
  type: GET_PANTRY_ING,
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

export const getPantryIngredients = () => async (dispatch) => {
  const res = await fetch('/api/pantry/pantryIngredients');
  const data = await res.json();
  if (res.ok) {
    await dispatch(getIngredients(data));
  }
}

export const updatePantry = (pantryId, formData) => async (dispatch) => {
  // const ingredientsToSend = await [...ingredients].join('--**--')
  // console.log('-----(ingredientsHAHA)', ingredients)
  const res = await fetch(`/api/pantry/${pantryId}`, {
    method: "POST",
    body: formData
    // headers: {
    //   "Content-Type": "application/json"
    // },
    // body: JSON.stringify({
    //   ingredients
    // }),
    // body: {
    //   ingredients: ingredientsToSend
    // }
  })
  console.log('-----(res)', res)
  const data = await res.json();
  console.log('-----(data)', data);
  if (res.ok) {
    await dispatch(addToPantry(data));
  } else {
    console.log('ERRRRRRRRRORRRRRRR')
  }
}

const initialState = {};

export default function pantryReducer(state = initialState, action) {
  // const prevState = { ...state }
  switch (action.type) {
    case GET_PANTRIES:
      const newState = { ...state, ...action.payload };
      return newState;
    case ADD_TO_PANTRY:
      return { ...state, ...action.payload };
    case GET_PANTRY_ING:
      return { ...state, ...action.payload };
    default:
      return state
  }
}