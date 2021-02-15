import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './sessions/login_form_container';
import SignupFormContainer from './sessions/signup_form_container';
import {AuthRoute, HomeAuthRoute, ErrorRoute} from '../util/route_util'
import NotFound from './errors/404';
import HomeLoggedOut from './home/logged_out/homeloggedout';
import HomeLoggedIn from './home/logged_in/homeloggedin';
// import HomeAuthRoute from '../util/route_util2';




const App = () => (
  <div>
    <Switch>
      
      <HomeAuthRoute exact path='/' component={HomeLoggedOut} otherComponent={HomeLoggedIn}/>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <Route exact path='/error' component={NotFound}/>
      <ErrorRoute />
      
    </Switch>
  </div>
);

export default App;
