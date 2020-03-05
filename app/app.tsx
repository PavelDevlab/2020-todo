
import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router';
import App from 'app/components/App';

import StyleContext from 'isomorphic-style-loader/StyleContext';
import { Provider } from "mobx-react";

import tasksStore from "./stores/TasksStore";

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();


const stores = {
  tasksStore
};

const insertCss = (...styles:any[]) => {
  // eslint-disable-next-line no-underscore-dangle
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};

export const browserRender = () => {

  ReactDOM.render(
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