export default function event(state={}, action) {
  switch(action.type){
    case 'LOADED_EVENTS':
      return Object.assign({}, state, {
        events: action.payload
      })
    break;

    default:
      return state
    break;
  }
}
