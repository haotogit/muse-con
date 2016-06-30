import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer as routing, routerMiddleware } from 'react-router-redux'
import makeRoutes from './routes'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import reducer from './reducers'
import { initialize, loadEvents } from './actions'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

const reducerCombo = combineReducers({
  reducer,
  routing
})

const middleware = [
    thunk,
    routerMiddleware(browserHistory)
]

if(process.env.NODE_ENV === 'development') {
  const logger = createLogger()
  middleware.push(logger)
}

const builtMiddle = compose(applyMiddleware(...middleware))
const store = createStore(reducerCombo, {}, builtMiddle)
store.dispatch(loadEvents())
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