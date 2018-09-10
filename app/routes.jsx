import React from 'react'
import { Route, IndexRoute, BrowserRouter as Router } from 'react-router'
import { push } from 'react-router-redux'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import Login from './containers/Login'
import EventContain from './containers/EventContain'
import UserSettings from './containers/User'
import RequireAuth from './containers/Auth'

export default (store) => {
  return (
    <div>
      <Route path="/" component={App}>
        <IndexRoute component={RequireAuth('dashboard', Dashboard)} />
        <Route path="login" component={Login} />
        <Route path="explore" component={RequireAuth('explore', EventContain)} />
        <Route path="user" component={RequireAuth('dashboard', UserSettings)} />
      </Route>
    </div>
  )
}
