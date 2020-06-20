import React from 'react'
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Container } from '@material-ui/core';
import Dashboard from './containers/Dashboard'
import Login from './containers/Login'
import EventContain from './containers/EventContain'
import UserSettings from './containers/User'
import Authorizer from './containers/Authorizer'
import AppWrapper from './containers/App'
import Navigation from './containers/Navigation'

export default () => {
  return (
    <Router>
			<Container fixed>
				<Navigation />
				<Switch>
					<Route path="/" exact={true} component={Authorizer(Dashboard)} />
						{/*<Route path="/explore" component={Authorizer(EventContain)} />
					<Route path="/user" component={Authorizer(UserSettings)} />
					*/}
					<Route path="/login" component={Login} />
				</Switch>
			</Container>
    </Router>
  )
}
