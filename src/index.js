// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import Favorites from './components/Favorites/Favorites';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import rootReducer from './redux/reducers';
import CocktailDetails from './components/CocktailDetails/CocktailDetails';

const store = createStore(rootReducer);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/details/:id" element={<CocktailDetails />} />
        </Route>
      </Routes>
    </Router>
  </Provider>,
);

reportWebVitals();
