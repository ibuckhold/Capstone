import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components//User/UsersList";
import { authenticate } from "./store/session";
import CreateIngredient from "./components/Ingredient/add_ingredient";
import { CreateRecipe } from "./components/Recipe/recipe"
import { Pantries } from './components/Pantry/pantry_container';
import { SavedRecipes } from './components/Recipe/savedRecipes';
import { SpecificRecipe } from './components/Recipe/eachRecipe';
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          {/* <h1>My Home Page</h1> */}
          <LandingPage />
        </ProtectedRoute>
        <ProtectedRoute path='/ingredient/add' exact={true}>
          <CreateIngredient />
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true}>
          <CreateRecipe />
        </ProtectedRoute>
        <ProtectedRoute path='/pantries' exact={true}>
          <Pantries />
        </ProtectedRoute>
        <ProtectedRoute path='/recipes' exact={true}>
          <SavedRecipes />
        </ProtectedRoute>
        <ProtectedRoute path='/recipe/:recipeId' exact={true}>
          <SpecificRecipe />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
