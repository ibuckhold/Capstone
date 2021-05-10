import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  if (!user) {
    return (
      <ul className="nav">
        <div>
          <NavLink to="/login" exact={true} className="icon" activeClassName="active">
            Login
            </NavLink>
        </div>
        <div>
          <NavLink to="/sign-up" exact={true} className="icon" activeClassName="active">
            Sign Up
            </NavLink>
        </div>
      </ul>
    )
  }
  else return (
    <nav>
      <ul className="nav">
        <div>
          <NavLink to="/" exact={true} className="icon fas fa-home" activeClassName="active">
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to="/pantries" exact={true} className="icon fas fa-door-closed" activeClassName="active">
            Pantry
          </NavLink>
        </div>
        <div>
          <NavLink to='/ingredients/add' exact={true} className="icon fas fa-carrot" activeClassName="active">
            Ingredients
          </NavLink>
        </div>
        <div>
          <NavLink to='recipe/create' exact={true} className="icon fas fa-scroll" activeClassName="active">
            Recipe
          </NavLink>
        </div>
        <div>
          <LogoutButton className="icon" />
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
