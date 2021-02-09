import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import SignupContainer from './../components/session/signup_container'
import LoginContainer from './../components/session/login_container'
import NavBarContainer from '../components/nav_bar/nav_bar_container'


export default () => (
  <div>
    <Route path="/" component={NavBarContainer} />
    <AuthRoute exact path="/signup" component={SignupContainer} />
    <AuthRoute exact path="/login" component={LoginContainer} />
  </div>
);
