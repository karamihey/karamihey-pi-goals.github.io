// libraries
import React from 'react';
import { Switch, Route } from 'react-router-dom';
// constants
import routes from 'constants/routes';
// components
import SignIn from 'components/Authorization/SignIn';
import SignUp from 'components/Authorization/SignUp';

const Authorization = () => (
  <div className="authorization-pages">
    <Switch>
      <Route component={SignIn} exact path={routes.signIn} />
      <Route component={SignUp} exact path={routes.signUp} />
    </Switch>
  </div>
);

export default Authorization;
