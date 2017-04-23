import popsicle from 'popsicle'
import { push } from 'react-router-redux'

function login(opts){
  return (dispatch) => {
    dispatch(loginRequest())
    popsicle({
      method: 'post',
      url: 'api/authenticate',
      body: opts
    })
    .then(res => {
      if (res.body.error) {
        if (res.body.error == 'Wrong Password') {
          
        }
      } else {
        dispatch(loginSuccess(res.body))
        dispatch(push(``))
      }
    })
  }
}

function checkUser (username) {
  return (dispatch) => {
    popsicle({
      method: 'post',
      url: 'api/username',
      body: username
    })
    .then(res => {
      dispatch(newUser(res.body ? false : true))
    })
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

    popsicle({
      method: 'post',
      url: 'api/user',
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

function loginRequest () {
  return {
    type: 'LOGIN_REQUEST'
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

function saveEvent (ev) {
  return (dispatch) => {

    popsicle({
      method: 'put',
      url: 'api/user',
      body: ev
    })
    .then(res => {
      dispatch(userUpdate(res.body))
    })
    .catch(err => console.log('error saving ev', err))
  }


}

export { login, logout, locationFound, checkUser, userSignup, userUpdate, saveEvent }
