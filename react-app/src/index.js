import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store'

const store = configureStore();

Object.deepEq = function ($, _) {
  if (
    !$ || !_ ||
    typeof $ !== 'object' ||
    typeof _ !== 'object'
  ) return false;
  const [$$, __] = [$, _].map(Object.values);
  if ($$.length !== __.length) return false;
  for (const $_ in $$) {
    if (
      typeof $$[+$_] !== typeof __[+$_] ||
      (
        typeof $$[+$_] === 'function' &&
        $$[+$_].toString() !== __[+$_].toString()
      ) ||
      (
        typeof $$[+$_] !== 'object' &&
        typeof $$[+$_] !== 'function' &&
        $$[+$_] !== __[+$_]
      ) ||
      (
        typeof $$[+$_] === 'object' &&
        $$[+$_] !== null &&
        !Object.deepEq($$[+$_], __[+$_])
      ) ||
      ($$[+$_] === null && $$[+$_] !== __[+$_])
    ) return false;
  }
  return true;
};


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
