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

const middleware = [
    thunk,
    routerMiddleware(browserHistory)
]

if(process.env.NODE_ENV === 'develop') {
  const logger = createLogger()
  middleware.push(logger)
}

const initialState = { 
  user: { 
    userAuth: { 
      
    } 
  } 
}

const builtMiddle = compose(applyMiddleware(...middleware))
const store = createStore(reducer, initialState, builtMiddle)

const routes = makeRoutes(store)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('app')
)
