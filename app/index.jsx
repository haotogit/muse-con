import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppContainer } from 'react-hot-loader'
import AppWrapper from './containers/App'
import './vendor'

const middleware = [
    thunk,
]

if(process.env.NODE_ENV === 'dev') {
  const logger = createLogger()
  middleware.push(logger)
}

const initialState = { 
  user: {} 
}

const builtMiddle = composeWithDevTools(applyMiddleware(...middleware))
const store = createStore(reducer, initialState, builtMiddle)
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5'
    },
    secondary: {
      main: '#64ffda'
    }
  },
  typography: { useNextVariants: true },
});

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);

if (module.hot && process.env.NODE_ENV === 'dev') {
  module.hot.accept();
}
