export default function event(state={}, action) {
  switch(action.type){
    case 'LOADED_EVENTS':
      return Object.assign({}, state, {
        events: action.payload
      })
    break;

    case 'REQUEST_EVENTS':
      return Object.assign({}, state, {
        loading: action.payload
      })

    break;

    default:
      return state
    break;
  }
}
