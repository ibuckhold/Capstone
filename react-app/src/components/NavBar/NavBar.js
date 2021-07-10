import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  if (!user) {
    return (
      <div className='navWrap'>
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
      </div>
    )
  }
  else return (
    <nav className='navWrap'>
      <div className="nav">
        <h2>Pantry Note</h2>
        <ul>
          <li><NavLink to="/home" exact={true} className="icon fas fa-home" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/pantries" exact={true} className="icon fas fa-door-closed" activeClassName="active">Pantry</NavLink></li>
          <li><NavLink to='/ingredient/add' exact={true} className="icon fas fa-carrot" activeClassName="active">Ingredients</NavLink></li>
          <li><NavLink to='/recipes' exact={true} className="icon fas fa-scroll" activeClassName="active">Recipe</NavLink></li>
          <li><NavLink to='/create/recipe' exact={true} className="" activeClassName="">Create a Recipe</NavLink></li>
          {/* <li><LogoutButton className="icon logout" /></li> */}
        </ul>
        <div className='socialMedia'>
          <a><i className='fas fa-sign-out-alt'></i></a>
          <a><i className="fab fa-linkedin"></i></a>
          <a><i className="fab fa-github-square"></i></a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
