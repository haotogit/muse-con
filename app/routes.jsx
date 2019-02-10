import React from 'react'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import Login from './containers/Login'
import EventContain from './containers/EventContain'
import UserSettings from './containers/User'
import { requireAuth } from './containers/Auth'

export default () => {

  return (
    <div>
      <Route path="/" exact component={requireAuth(Dashboard)} />
      <Route path="/explore" component={requireAuth(EventContain)} />
      <Route path="/user" component={requireAuth(UserSettings)} />
      <Route path="/login" component={Login} />
    </div>
  )
}
