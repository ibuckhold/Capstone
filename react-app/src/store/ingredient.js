//ACTIONS
const SET_INGREDIENT = "SET_INGREDIENT";
const GET_ALL_INGREDIENTS = "GET_ALL_INGREDIENTS"

const setIngredient = (ingredient) => ({
  type: SET_INGREDIENT,
  payload: ingredient
})

const getAllIngredients = (payload) => ({
  type: GET_ALL_INGREDIENTS,
  payload
})


//THUNKS
export const getIngredients = () => async (dispatch) => {
  const res = await fetch('/api/ingredients')
  const { ingredients } = await res.json()
  await dispatch(getAllIngredients(ingredients))
  return ingredients
}


export const addingIngredient = (name) => async (dispatch) => {
  const res = await fetch('/api/ingredients/owned', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name
    })
  });
  const data = await res.json();
  dispatch(setIngredient(data))
  return data;
}

const initialState = {}

//REDUCER 
export default function ingredientReducer(state = initialState, action) {
  const previousState = { ...state };
  switch (action.type) {
    case SET_INGREDIENT:
      return { ...previousState, [action.payload.id]: action.payload };
    case GET_ALL_INGREDIENTS:
      return { ...action.payload };
    default:
      return state;
  }
}