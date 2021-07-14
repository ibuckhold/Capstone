import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const history = useHistory();

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
          <li onClick={() => history.push('/home')}><div onClick={() => history.push('/home')} className="icon fas fa-home" activeClassName="active">Home</div></li>
          <li onClick={() => history.push('/pantries')}><div onClick={() => history.push('/pantries')} className="icon fas fa-door-closed" activeClassName="active">Pantry</div></li>
          <li onClick={() => history.push('/ingredient/add')}><div onClick={() => history.push('/ingredient/add')} className="icon fas fa-carrot" activeClassName="active">Ingredients</div></li>
          <li onClick={() => history.push('/recipes')}><div onClick={() => history.push('/recipes')} className="icon fas fa-scroll" activeClassName="active">SavedRecipes</div></li>
          <li onClick={() => history.push('/create/recipe')}><div onClick={() => history.push('/create/recipe')} className="icon fas fa-plus-circle" activeClassName="">CreateRecipe</div></li>
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
