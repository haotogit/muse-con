import { eventLoader, keyMaker } from '../helpers'
import popsicle from 'popsicle'
import qString from 'query-string'

function requestEvents(opt){
  return {
    type: 'REQUEST_EVENTS',
    payload: opt
  }
}

function loadedEvents(payload){
  return {
    type: 'LOADED_EVENTS',
    payload
  }
}

function loadEvents(userObj) {
  let load = [],
      evObj = {}  

  return (dispatch) => {
    // signal initializing request
    dispatch(requestEvents(true))

    eventLoader(userObj)
      .then(resp => {
        resp.forEach((each, i) => {
          let str = each.query.keyword
          let key = keyMaker(str)

          evObj[key] = []
          if (each.body._embedded && each.body._embedded.events) {
            each.body._embedded.events.forEach(ev => evObj[key].push(ev))
          }
        })

        dispatch(loadedEvents(evObj))
        dispatch(requestEvents(false))
      })
  }
}

function toggleSearchOpt (key, currState) {
  currState[key].exclude = currState[key].exclude ? false : true

  return (dispatch) => {
    dispatch({type: 'TOGGLE_SEARCH_OPT', payload: currState})
  }
}

export { loadEvents, toggleSearchOpt }
