import popsicle from 'popsicle'

function requestEvents(options){
  return {
    type: 'REQUESTING_EVENTS',
    options
  }
}

function loadedEvents(events){
  return {
    type: 'LOADED_EVENTS',
    events
  }
}

export function loadEvents(options){
  return (dispatch) => {
    // signal initializing request
    dispatch(requestEvents(options))
    // return from dispatch from thunkmiddleware
    return popsicle('https://api.soundcloud.com/users/92096540?client_id=3b98ab9c1bbc191c8a3ccb86af57d208')
           .then(res => dispatch(loadedEvents(JSON.parse(res.body))))
  }
}
