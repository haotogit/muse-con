export default function user(state={}, action) {
  switch(action.type){
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        userAuth: action.payload
      })
    break;

    case 'CURR_USER_LOCATION':
      return Object.assign({}, state, {
        userAuth: action.payload
      })
    break;

    case 'USER_UPDATE':
      return Object.assign({}, state, {
        userAuth: action.payload
      })
    break;

    case 'NEW_USER':
      return Object.assign({}, state, {
        newUser: action.payload
      })
    break;

    case 'USERNAME_EXISTS':
      return Object.assign({}, state, {
        usernameExists: action.payload
      })
    break;

    case 'LOADED_USER_EVENTS':
      return Object.assign({}, state, {
        events: action.payload
      })
    break;

    default:
      return state
    break;
  }
}
