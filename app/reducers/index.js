export default function reducer(state={}, action) {
  switch(action.type){
    case 'INIT':
      return Object.assign({}, state, {
               user: action.message
             })
    break;

    case 'CHANGE_TEXT':
      return Object.assign({}, state, {
               text: action.message
             })
    break;

    case 'USER_LOGIN':
      return Object.assign({}, state, {
        user : true
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
