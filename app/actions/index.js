import * as e_t from '../event_types'
import popsicle from 'popsicle'

export function initialize(message){
  return { type: 'INIT', message }
}

export function changeText(message){
  return {type: 'CHANGE_TEXT', message}
}

export function updateText(e){
  console.log('updateTaction: ', e)
  return changeText(e)
}

export function login(){
  return { type: 'USER_LOGIN' }
}

export function logout () {
  return { type: 'LOGOUT' }
}

export function auth(opt){
  return { type: 'AUTH', payload: opt }
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
