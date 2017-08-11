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

    case 'SET_SEARCH_LIST':
      return Object.assign({}, state, {
        searchList: action.payload
      })

    case 'TOGGLE_ARTIST':
      return Object.assign({}, state, {
        searchList: action.payload
      })

    break;

    default:
      return state
    break;
  }
}
