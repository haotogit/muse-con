import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer as routing, routerMiddleware } from 'react-router-redux'
import makeRoutes from './routes'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AppContainer } from 'react-hot-loader';
import './vendor';

const middleware = [
    thunk,
    routerMiddleware(browserHistory)
]

if(envVars.NODE_ENV === 'develop') {
  const logger = createLogger()
  middleware.push(logger)
}

const initialState = { 
  user: { 
    userAuth: { 
      
    } 
  } 
}
const muiTheme = getMuiTheme({
  palette: {
    palette: {
      primary1Color: 'white'
    }
  },
})

const builtMiddle = composeWithDevTools(applyMiddleware(...middleware))
const store = createStore(reducer, initialState, builtMiddle)

const routes = makeRoutes(store)
const history = syncHistoryWithStore(browserHistory, store)

injectTapEventPlugin();

render(
  <AppContainer>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Provider store={store}>
        <Router history={history}>
          { routes }
        </Router>
      </Provider>
    </MuiThemeProvider>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
