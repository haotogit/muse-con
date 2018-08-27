import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import user from './user'
import event from './event'
import main from './main'

export default combineReducers({
  routing,
  main,
  user,
  event
})
