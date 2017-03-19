import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import user from './user'
import event from './event'

export default combineReducers({
  routing,
  user,
  event
})
