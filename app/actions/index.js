import * as e_t from '../event_types'
import popsicle from 'popsicle'
import { push, routerActions } from 'react-router-redux'

export function login(opts){
  return (dispatch) => {
    dispatch(loginRequest())
    popsicle({
      method: 'post',
      url: 'http://localhost:8888/api/authenticate',
      body: opts
    })
    .then(res => {
      console.log('prizPopsicle: ', res)
      if (res.error) console.log('bad pw: ', res)
      else {
        dispatch(loginSuccess(res.body))
        dispatch(push(``))
      }
    })
  }
}

export function loginSuccess (payload) {
  return {
    type: 'LOGIN_SUCCESS',
    payload
  }
}

export function loginRequest () {
  return {
    type: 'LOGIN_REQUEST'
  }
}

export function logout () {
  return { type: 'LOGOUT', null }
}

export function thirdPartyToken (payload) {
  return {
    type: 'THIRD_PARTY_TOKEN',
    payload
  }
}


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
