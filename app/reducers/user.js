export default function user(state={}, action) {
  switch(action.type){
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        auth: action.payload
      })
    break;

    case 'CURR_USER_LOCATION':
      return Object.assign({}, state, {
        auth: action.payload
      })
    break;

    case 'USER_UPDATE':
      return Object.assign({}, state, {
        auth: action.payload
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
