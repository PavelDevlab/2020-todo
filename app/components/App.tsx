
import React from 'react';
import { Route, Switch } from 'react-router';

import NotFoundPage from 'app/components/pages/NotFoundPage';
import Tasks from 'app/components/pages/Tasks';

const App = ():JSX.Element => {

    return (
        <Switch>
          <Route path="/" exact={true}>
            <Tasks />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
    );
};

export default App;
