const SET_RECIPE = "SET_RECIPE";
const GET_RECIPES = "GET_RECIPES";
const GETMY_RECIPES = "GETMY_RECIPES";

const setRecipe = (recipe) => ({
  type: SET_RECIPE,
  payload: recipe
})

const getRecipes = (recipes) => ({
  type: GET_RECIPES,
  payload: recipes
})

const getSavedRecipes = (myRecipes) => ({
  type: GETMY_RECIPES,
  payload: myRecipes
})

export const getAllRecipes = () => async (dispatch) => {
  const res = await fetch('api/recipe/get');
  const recipes = await res.json();
  if (res.ok) {
    await dispatch(getRecipes(recipes));
  }
}

export const getMyRecipes = () => async (dispatch) => {
  const res = await fetch('api/recipe/mine');
  const myRecipes = await res.json();
  if (res.ok) {
    await dispatch(getSavedRecipes(myRecipes));
  }
}

export const createRecipe = (recipeName, instructions, estimatedTime) => async (dispatch) => {
  const res = await fetch('/api/recipe', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipeName,
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
    case GET_RECIPES:
      return { ...state, ...action.payload }
    case GETMY_RECIPES:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}