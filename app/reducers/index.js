import { combineReducers } from 'redux'
import user from './user'
import event from './event'
import main from './main'

const initialState = { 
  user: { 
    userAuth: { 

    } 
  } 
}

export default (state, action) => {
  if (action && action.type === 'LOGOUT') {
    state = Object.assign({}, initialState);
  }

  return combineReducers({
    main,
    user,
    event
  })(state, action)
}
