const SET_RECIPE = "SET_RECIPE";

const setRecipe = (recipe) => ({
  type: SET_RECIPE,
  payload: recipe
})

export const createRecipe = (recipeName, userId, instructions, estimatedTime) => async (dispatch) => {
  const res = await fetch('/api/recipe', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipeName,
      userId,
      instructions,
      estimatedTime
    })
  });
  const data = await res.json();
  dispatch(setRecipe(data))
}

const initialState = {};

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RECIPE:
      return { "recipe": action.payload }
    default:
      return state;
  }
}