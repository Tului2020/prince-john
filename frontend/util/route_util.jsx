import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  // debugger
  <Route 
    path={path}
    exact={exact}
    render={props => 
      !loggedIn ? <Component {...props} /> : <Redirect to='/' />
    }
  />
)

const mSTP = state => ({
  loggedIn: Boolean(state.session.currentUserId)
})

export const AuthRoute = withRouter(
  connect(
    mSTP,
    null
  )(Auth)
)


const HomeAuth = ({ component: Component, otherComponent: OtherComponent, path, loggedIn, exact }) => (
  <Route 
    path={path}
    exact={exact}
    render={props => 
      !loggedIn ? <Component {...props} /> : <OtherComponent {...props} />
    }
  />
)

export const HomeAuthRoute = withRouter(
  connect(
    mSTP,
    null
  )(HomeAuth)
)