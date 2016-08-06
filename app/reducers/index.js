export default function reducer(state={}, action) {
  switch(action.type){

    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        userAuth: action.payload
      })
    break;

    case 'LOGOUT':
      return Object.assign({}, state, {
        userAuth: action.payload
      })
    break;

    case 'LOADED_EVENTS':
      return Object.assign({}, state, {
        events: action.events
      })
    break;

    default:
      return state
    break;
  }
}
