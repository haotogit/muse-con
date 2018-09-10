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

function loadEvents(userObj, list) {
  let load = [],
    evObj = {}  

  return (dispatch) => {
    // signal initializing request

    eventLoader(userObj, list, dispatch)
      .then(resp => {
        resp.forEach((each, i) => {
          let str = each && each._links ? each._links.self.href.split('=')[2] : '';
          let key = keyMaker(str)

          evObj[key] = []
          if (each && each._embedded && each._embedded.events) {
            each._embedded.events.forEach(ev => {
              if (userObj.events && !userObj.events.find(userEv => ev.id == userEv.id)) evObj[key].push(ev)
            })
          }
        })

        dispatch({ type: 'LOADING', payload: false });
        dispatch(loadedEvents(evObj))
      })
  }
}

function toggleSearchOpt (key, currState) {
  currState[key].exclude = currState[key].exclude ? false : true

  return (dispatch) => {
    dispatch({type: 'TOGGLE_SEARCH_OPT', payload: currState})
  }
}

function setSearchList(payload) {
  return {
    type: 'SET_SEARCH_LIST',
    payload
  }
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
