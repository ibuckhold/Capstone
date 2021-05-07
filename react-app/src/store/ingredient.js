//ACTIONS
const SET_INGREDIENT = "SET_INGREDIENT";

const setIngredient = (ingredient) => ({
  type: SET_INGREDIENT,
  payload: ingredient
})


//THUNKS

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
}

const initialState = {
  ingredient: null
}

//REDUCER 
export default function ingredientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INGREDIENT:
      return { ingredient: action.payload };
    default:
      return state;
  }
}