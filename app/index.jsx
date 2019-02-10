import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
//import { syncHistoryWithStore, routerReducer as routing, routerMiddleware } from 'react-router-redux'
import makeRoutes from './routes'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import { blue, pink } from 'material-ui/styles/colors'
import { AppContainer } from 'react-hot-loader'
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

const routes = makeRoutes(store)

render(
  <AppContainer>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Provider store={store}>
        <BrowserRouter>
          { routes }
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot && process.env.NODE_ENV === 'DEV') {
  module.hot.accept();
}
