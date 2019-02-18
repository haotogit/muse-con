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
import Authorizer from './containers/Authorizer'
import './vendor'

const middleware = [
    thunk,
]

if(process.env.NODE_ENV === 'DEV') {
  const logger = createLogger()
  middleware.push(logger)
}

const initialState = { 
  user: { 
    userAuth: { 
      
    } 
  } 
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
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);

if (module.hot && process.env.NODE_ENV === 'DEV') {
  module.hot.accept();
}
