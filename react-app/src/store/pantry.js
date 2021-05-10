const SET_PANTRIES = 'SET_PANTRIES';

const setPantries = (pantries) => ({
  type: SET_PANTRIES,
  payload: pantries
})

export const showPantries = () => async (dispatch) => {
  const res = await fetch('/api/pantry/ingredients');
  const data = await res.json();
  console.log('------>', data);
  if (res.ok) {
    await dispatch(setPantries(data));
  } else {
    console.log('response', data);
    throw res;
  }
}

const initialState = {};

export default function pantryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PANTRIES:
      const newState = { ...action.payload }
      return newState
    default:
      return state
  }
}