import popsicle from 'popsicle'
import { push } from 'react-router-redux'
import { popWrap } from '../helpers'
import { loadedEvents } from './events';
import urlLib from 'url'
const config = require('../../server/config/config');

const BASE_PATH = urlLib.format(config.app.api);

function login(opts){
  const options = {
    method: 'POST',
    url: `${BASE_PATH}/users/auth`,
    body: {
      username: 'barry',
      password: 'password'
      //username: opts.username,
      //password: opts.password 
    }
  };

  return (dispatch) => {
    dispatch(loginRequest(options.body))

    popWrap(options, dispatch, loginSuccess)
      .then((data) => {
        if (data){
          const opts = {
            method: 'GET',
            url: `${BASE_PATH}/users/${data.id}?accessList=all`,
            headers: {
              Authorization: `Bearer ${data.accessToken}`
            }
          };

          return popWrap(opts, dispatch, userUpdate)
            .then(resp => {
              dispatch({ type: 'SET_SEARCH_LIST', payload: resp.artists });
              dispatch(push(''));
            })
        }
      });
  }
}

function checkUser (username, user) {
  return (dispatch) => {
    popWrap({
      method: 'POST',
      url: '/username',
      body: username,
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    })
    .then(res => {
      let payload = res.body ? false : true;

      dispatch({ type: 'USERNAME_EXISTS', payload });
    });
  }
}

function newUser (payload) {
  return {
    type: 'NEW_USER',
    payload
  }
}

function userSignup (obj) {
  return (dispatch) => {
    dispatch(newSignup(obj))

    popWrap({
      method: 'POST',
      url: `${BASE_PATH}/users`,
      body: obj
    })
    .then(res => {
      if (!res.error) {
        dispatch(loginSuccess(res.body))
        dispatch(push(''))
      }   
    })
  }
}

function loginSuccess (payload) {
  return {
    type: 'LOGIN_SUCCESS',
    payload
  }
}

function loginRequest (payload) {
  return {
    type: 'LOGIN_REQUEST',
    payload
  }
}

function logout () {
  return  { 
    type: 'LOGOUT',
    payload: {}
  }
}

function locationFound (payload) {
  // save user location to db
  
  return (dispatch) => {
    let currObj = {
      type: 'CURR_USER_LOCATION',
      payload
    }
    dispatch(currObj)
  }
}

function tixMasterOpts (currUser) {
  let opts = currUser

  return (dispatch) => dispatch({type: 'TIX_MASTER_OPTS', opts})
}

function newSignup (payload) {
  return {
    type: 'NEW_USER_SIGNUP',
    payload
  }
}

function userUpdate (payload) {
  return {
    type: 'USER_UPDATE',
    payload
  }
}

function saveEvent (user, ev, events?, key?, index?) {
  let userEvents = user.events,
    evIndex,
    searchEvents;

  if (userEvents.find(ea => ea.id === ev.id)) {
    evIndex = userEvents.find(ea => ea.id === ev.id);
    userEvents.splice(evIndex, 1);
  } else {
    userEvents.push(ev);

    if (events && key && index) {
      searchEvents = events;
      searchEvents[key].splice(index, 1);
    }
  }

  return (dispatch) => {
    if (searchEvents) dispatch(loadedEvents(searchEvents));

    popWrap({
      method: 'PUT',
      url: `${BASE_PATH}/users/${user._id}`,
      body: {
       events: userEvents 
      },
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    })
    .then(res => {
      dispatch(userUpdate(res.body))
    })
    .catch(err => console.log('error saving ev', err))
  }
}

export { login, logout, locationFound, checkUser, userSignup, userUpdate, saveEvent, newUser }
