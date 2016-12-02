import popsicle from 'popsicle'
import qString from 'query-string'

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

function loadEvents(options){
  // apikey, latlong, keyword, classificationName, radius 
  let latLong = `${options.lat},${options.long}`,
      radius = 50
  let qParams = {
    apikey: `${process.env.TICKETMASTER_KEY}`,
    latlong: latLong,
    radius: radius
  }
  let query = `/discovery/events.json?${qString.stringify(qParams)}`

  let url = `${process.env.TICKETMASTER_URL}${query}`

  let opts = {
    method: 'GET',
    url
  }
  
  return (dispatch) => {
    // signal initializing request
    dispatch(requestEvents(options))
    // return from dispatch from thunkmiddleware

    return popsicle(opts)
            .then((resp) => dispatch(loadedEvents(resp.body)))
  }
}

function toggleArtist (artistObj) {
  console.log('art', artistObj.currentTarget)
  // why do i have to return a function for dispatch to be avail ?
  return (dispatch) => dispatch({ type: 'TOGGLE_ARTIST', artistObj })
}

export { loadEvents, toggleArtist }
