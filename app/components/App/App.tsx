
import React from 'react';
import { Route, Switch } from 'react-router';

import NotFoundPage from 'components/pages/NotFoundPage';
import Tasks from 'components/pages/Tasks/Tasks';

import appCSS from './app.scss';
import withStyles from "isomorphic-style-loader/withStyles";

const App:React.FunctionComponent<{}> = () => {

    return (
        <div className={appCSS['content']}>
          <Switch>
            <Route path="/" exact={true}>
              <Tasks />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
    );
};

export default withStyles(appCSS)(App);
