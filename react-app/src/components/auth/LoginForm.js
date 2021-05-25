import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import './login.css'


const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  async function demoPerson(e) {
    e.preventDefault();
    const email = "demo@aa.io";
    dispatch(login({ 'email': email, "password": "password" }))
      .catch(async (res) => {
        const data = await res.json();
        console.log(data)
      });
  }

  const onDemoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/home" />;
  }

  return (

    <main>
      <div className="login">
        <div className="contain">
          <form onSubmit={onLogin}>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div>
              <label className='formStuff' htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <label className='formStuff' htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={updatePassword}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <form onSubmit={onDemoLogin}>
            <button type="submit">Demo User</button>
          </form>
          <div className="not">
            <p>Not a Pantry Note member? <NavLink to='/sign-up'>Sign up here</NavLink></p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
