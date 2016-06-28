import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import UserContain from './containers/UserContain'
import Login from './containers/Login'

export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { reducer: { user } } = store.getState()
    console.log('user: ', user)
    if(!user) {
      replace({
        pathname: '/login',
      })
    }
    callback()
  }

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="users" component={UserContain} />
   </Route>
  )
}
