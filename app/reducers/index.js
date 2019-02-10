import { combineReducers } from 'redux'
import user from './user'
import event from './event'
import main from './main'

export default combineReducers({
  main,
  user,
  event
})
