import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { Switch, BrowserRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Dashboard from './Dashboard'
import Navigation from './Navigation'
import Login from './Login'
import EventContain from './EventContain'
import UserSettings from './User'
import Authorizer from './Authorizer'
import { logout } from '../actions'

const App = () => {
  let styles = {
    position:'relative',
    padding:'0 2em'
  }

  const gridStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });

  return(
    <div className='container-fluid' style={styles}>
      <Navigation />
        <Switch>
          <Route path="/" exact={true} component={Authorizer(Dashboard)} />
          <Route path="/explore" component={Authorizer(EventContain)} />
          <Route path="/user" component={Authorizer(UserSettings)} />
          <Route path="/login" component={Login} />
        </Switch>
    </div>
  )
}

export default App
//export default App
