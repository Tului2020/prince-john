import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const mSTP = state => ({
  loggedIn: Boolean(state.session.currentUserId)
})


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


const Prot = ({ component: Component, path, loggedIn, exact }) => (
  // debugger
  <Route 
    path={path}
    exact={exact}
    render={props => 
      loggedIn ? <Component {...props} /> : <Redirect to='/' />
    }
  />
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




const Error = () => (
  <Route 
    render={() => 
      <Redirect to='/404'/>
    }
  />
)

export const ErrorRoute = withRouter(
  connect(
    mSTP,
    null
  )(Error)
)




export const HomeAuthRoute = withRouter(
  connect(
    mSTP,
    null
  )(HomeAuth)
)

export const AuthRoute = withRouter(
  connect(
    mSTP,
    null
  )(Auth)
)

export const ProtectedRoute = withRouter(
  connect(
    mSTP,
    null
  )(Prot)
)