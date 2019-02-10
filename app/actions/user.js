import popsicle from 'popsicle'
import { push } from 'react-router-redux'
import urlLib from 'url'
import rp from 'request-promise'
import promise from 'bluebird';
import alertify from 'alertify.js'
import { popWrap } from '../helpers'
import { loadedEvents } from './events'
import config from '../../config/app.config'

const BASE_PATH = urlLib.format(config.app.api);

function login(opts){
  const options = {
    method: 'POST',
    url: `${BASE_PATH}/users/auth`,
    body: {
      username: opts.username,
      password: opts.password 
    }
  };

  return (dispatch) => {
    dispatch(loginRequest(options.body))

    return popWrap(options, dispatch, loginSuccess);
  }
}

function checkUser (username, user) {
  return (dispatch) => {
    popWrap({
      method: 'POST',
      url: `${BASE_PATH}/username`,
      body: username,
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    }, dispatch)
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
    }, dispatch)
    .then(res => {
      if (res) {
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

// REFACTOR!! separate and abstract http
//  events?, key?, index?
function saveEvent(user, ev, events, key, index) {
  let evIndex,
    searchEvents,
    opts = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
      json: true,
    };
  let condition = events && Array.isArray(events) && events.find(ea => ea.id === ev.id);

  ev.userId = user.id;
  ev.externalId = ev.id;
  //if deleting
  if (condition) {
    opts.method = 'DELETE';
    opts.url = `${BASE_PATH}/events/${ev._id}`;
    //searchEvents = [];
  } else {
    opts.method = 'POST';
    opts.url = `${BASE_PATH}/events`;
    opts.body = ev;
    opts.body.externalId = ev.id;
    opts.body.userId = user.id;
    delete opts.body.id;
    events[key].splice(index, 1);
    searchEvents = Object.assign({}, events);
  }

  return (dispatch) => {
    //if deleting
    dispatch({ type: 'LOADING', payload: true });
    if (condition) {
      return rp(opts)
        .then(data => {
          let getOpts = {
            method: 'GET',
            url: `${BASE_PATH}/users/${user.id}/events`,
            headers: {
              Authorization: `Bearer ${user.accessToken}`
            }
          };

          return popWrap(getOpts, dispatch, loadedUserEvents);
        })
        .catch(err => {
          alertify.alert(err.message);
          dispatch({ type: 'FAILED REQUEST', payload: err });
          dispatch({ type: 'LOADING', payload: false });
        });
    } else {
      dispatch(loadedEvents(searchEvents));
      return rp(opts)
        .then(res => {
          dispatch({ type: 'LOADING', payload: false });
        })
        .catch(err => {
          alertify.alert(err.message);
          dispatch({ type: 'FAILED REQUEST', payload: err });
          dispatch({ type: 'LOADING', payload: false });
        });
    }
  }
}

function loadedUserEvents(payload) {
  return {
    type: 'LOADED_USER_EVENTS',
    payload
  }
}

function getUserEvents(user) {
  let opts = {
    method: 'GET',
    url: `${BASE_PATH}/users/${user.id}/events`,
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  };

  return (dispatch) => {
    return popWrap(opts, dispatch, loadedUserEvents);
  }
}

export { login, logout, locationFound, checkUser, userSignup, userUpdate, saveEvent, newUser, getUserEvents }
