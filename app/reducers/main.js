export default function main(state={}, action) {
  switch(action.type) {
    case 'LOADING':
      return Object.assign({}, state, {
        loading: action.payload
      })
    break;

    default:
      return state
    break;
  }
}
