import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components//User/UsersList";
// import User from "./components/User/User";
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";
import CreateIngredient from "./components/Ingredient/add_ingredient";
import CreatePantry from "./components/Pantry/add_pantry";
import { Pantries } from './components/Pantry/pantry_container';
import { CreateRecipe } from './components/Recipe/recipe';
import { showPantries } from './store/pantry';
import { getIngredients } from './store/ingredient';

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(showPantries());
      await dispatch(getIngredients());
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
        {/* <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path="/" exact={true}>
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <ProtectedRoute path='/ingredient/add' exact={true}>
          <CreateIngredient />
        </ProtectedRoute>
        <ProtectedRoute path='/recipes' exact={true}>
          <CreateRecipe />
        </ProtectedRoute>
        <ProtectedRoute path='/pantries' exact={true}>
          <Pantries />
          {/* <CreatePantry /> */}
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
