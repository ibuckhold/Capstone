const GET_PANTRIES = 'GET_PANTRIES';
const ADD_TO_PANTRY = "ADD_TO_PANTRY";
const SET_ACTIVE_PANTRY = "SET_ACTIVE_PANTRY";
// const GET_PANTRY_ING = "GET_PANTRY_ING"

const getPantries = (pantries) => ({
  type: GET_PANTRIES,
  payload: pantries
})

const addToPantry = (ingredients) => ({
  type: ADD_TO_PANTRY,
  payload: ingredients
})

export const grabActivePantry = (pantry) => ({
  type: SET_ACTIVE_PANTRY,
  payload: pantry
})

// const getIngredients = (ingredients) => ({
//   type: GET_PANTRY_ING,
//   payload: ingredients
// })

export const showPantries = () => async (dispatch) => {
  const res = await fetch('/api/pantry/ingredients');
  const data = await res.json();
  if (res.ok) {
    dispatch(getPantries(data));
  } else {
    throw res;
  }
}

export const getPantryIngredients = () => async (dispatch) => {
  const res = await fetch('/api/pantry/ingredients');
  const data = await res.json();
  if (res.ok) {
    dispatch(getPantries(data))
  }
}

export const updatePantry = (pantryId, formData) => async (dispatch) => {
  const res = await fetch(`/api/pantry/${pantryId}`, {
    method: "POST",
    body: formData
  })
  const data = await res.json();
  if (res.ok) {
    dispatch(addToPantry(data));
  } else {
    throw res;
  }
}

const initialState = {
  selected_pantry: null,
  all_pantries: {}
};

export default function pantryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PANTRIES:
      const newState = { ...state, ...action.payload };
      return newState;
    case ADD_TO_PANTRY:
      state.all_pantries[action.payload.selected_pantry.id].ingredients = action.payload.selected_pantry.ingredients
      return { ...state, ...action.payload };
    case SET_ACTIVE_PANTRY:
      return { ...state, selected_pantry: action.payload };
    default:
      return state
  }
}
