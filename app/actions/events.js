import { eventLoader, keyMaker } from '../helpers'
import popsicle from 'popsicle'
import qString from 'query-string'
import alertify from 'alertify.js'

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

function loadEvents(userObj, list) {
  let load = [],
    evObj = {}  

  return (dispatch) => {
    // signal initializing request
    dispatch({ type: 'LOADING', payload: true });
    eventLoader(userObj, list)
      .then(resp => {
        resp.forEach((each, i) => {
          let name = each && each._links ? each._links.self.href.split('=')[2] : '';
          let key = keyMaker(name)

          if (each && each._embedded && each._embedded.events) {
            evObj[key] = each._embedded.events;
          }
        })

        dispatch({ type: 'LOADING', payload: false });
        dispatch(loadedEvents(evObj))
      })
      .catch((err) => {
        dispatch({ type: 'FAILED REQUEST', payload: err.message });
        dispatch({ type: 'LOADING', payload: false });
        alertify.alert(err.message);
      });
  }
}

function toggleSearchOpt (key, currState) {
  currState[key].exclude = currState[key].exclude ? false : true

  return (dispatch) => {
    dispatch({type: 'TOGGLE_SEARCH_OPT', payload: currState})
  }
}

function setSearchList(payload) {
  return (dispatch) => dispatch({
    type: 'SET_SEARCH_LIST',
    payload
  })
}

function toggleArtist (artist, list) {
  let newList = []
  if (artist.name) {
    let currIndex = list.findIndex(each => artist.name == each.name)
    
    list[currIndex].exclude = !list[currIndex].exclude
    list.forEach(each => newList.push(each))
  } else {
    list.forEach(each => {
      each.exclude = artist
      newList.push(each)
    })
  }

  return (dispatch) => {
    dispatch(setSearchList(newList)) 
  }
}

export { loadEvents, toggleSearchOpt, setSearchList, toggleArtist, loadedEvents }
