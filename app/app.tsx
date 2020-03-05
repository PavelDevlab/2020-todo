
import React from 'react';
import { hydrate } from 'react-dom';

import { Router } from 'react-router';
import App from 'app/components/App';

import StyleContext from 'isomorphic-style-loader/StyleContext';
import { Provider } from "mobx-react";

import articlesStore from "./stores/todos";

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();


const stores = {
  articlesStore
};

const insertCss = (...styles:any[]) => {
  // eslint-disable-next-line no-underscore-dangle
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};

export const browserRender = () => {

  hydrate(
    <Provider {...stores}>
      <StyleContext.Provider value={{ insertCss }}>
        <Router history={history}>
          <App />
        </Router>
      </StyleContext.Provider>
    </Provider>,
    document.getElementById('app'),
  );
};