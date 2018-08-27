import React from 'react'
import { Route, IndexRoute, BrowserRouter as Router } from 'react-router'
import { push } from 'react-router-redux'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import UserContain from './containers/UserContain'
import Login from './containers/Login'
import EventContain from './containers/EventContain'
import UserSettings from './containers/User'
import { requireAuth } from './containers/Auth'

export default (store) => {

  return (
    <Router basename="/muse-con">
      <Route path="/" component={App}>
        <IndexRoute component={requireAuth(Dashboard)} />
        <Route path="login" component={Login} />
        <Route path="users" component={requireAuth(UserContain)} />
        <Route path="explore" component={requireAuth(EventContain)} />
        <Route path="user" component={requireAuth(UserSettings)} />
      </Route>
    </Router>
  )
}
