import React, { Component } from 'react'
import { Route } from 'react-router'
import { Switch, BrowserRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Dashboard from './Dashboard'
import Login from './Login'
import EventContain from './EventContain'
import UserSettings from './User'
import Authorizer from './Authorizer'
import { logout } from '../actions'
import Routes from '../routes'

const App = () => {
  let styles = {
    position:'relative'
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
		<Routes />
  )
}

export default App
