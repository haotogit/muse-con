import React from 'react'
import { Route } from 'react-router'
import { Switch, BrowserRouter } from 'react-router-dom'
import Dashboard from './containers/Dashboard'
import Login from './containers/Login'
import EventContain from './containers/EventContain'
import UserSettings from './containers/User'
import Authorizer from './containers/Authorizer'
import AppWrapper from './containers/App'

export default () => {
  return (
    
     {/*  <Switch>
        <Route path="/" exact={true} component={Authorizer(Dashboard)} />
      <Route path="/" component={AppWrapper} />
        <Route path="/explore" component={Authorizer(EventContain)} />
        <Route path="/user" component={Authorizer(UserSettings)} />
        <Route path="/login" component={Login} />
      </Switch>
    */}
    </BrowserRouter>     
  )
}
