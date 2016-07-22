import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { push } from 'react-router-redux'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import UserContain from './containers/UserContain'
import Login from './containers/Login'
import EventContain from './containers/EventContain'
import { requireAuth } from './containers/Auth'

export default (store) => {

  return (
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
      <IndexRoute component={requireAuth(Dashboard)}  />
      <Route path="users" component={requireAuth(UserContain)} />
      <Route path="events" component={requireAuth(EventContain)} />
   </Route>
  )
}
