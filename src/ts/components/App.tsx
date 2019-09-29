// libraries
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// constants
import ROUTES from 'constants/routes';
// components
import Authorization from 'components/Authorization';

const App = () => (
  <div className="App">
    <Switch>
      <Route component={Authorization} path={ROUTES.authorization} />
    </Switch>

    <ToastContainer newestOnTop />
  </div>
);

export default App;
