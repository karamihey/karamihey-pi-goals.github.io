// libraries
import React from 'react';
import { Switch, Route } from 'react-router-dom';
// constants
import routes from 'constants/routes';
// components
import Authorization from 'components/Authorization';

const App = () => (
  <div className="App">
    <Switch>
      <Route component={Authorization} path={routes.authorization} />
    </Switch>
  </div>
);

export default App;
