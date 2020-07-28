import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import AppWrapper from './containers/App'
import './vendor'

const middleware = [
    thunk,
]

if (process.env.NODE_ENV === 'dev') {
  const logger = createLogger()
  middleware.push(logger)
}

const initialState = { 
  user: {} 
}

const store = createStore(reducer, initialState, compose(applyMiddleware(...middleware)))

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5899E2'
    },
    secondary: {
      main: '#FFAA00'
    }
  },
  typography: { useNextVariants: true },
})

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
)
