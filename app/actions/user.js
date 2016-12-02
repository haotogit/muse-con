import popsicle from 'popsicle'
import { push, routerActions } from 'react-router-redux'

function login(opts, userAuth){
  return (dispatch) => {
    dispatch(loginRequest())
    popsicle({
      method: 'post',
      url: 'api/authenticate',
      body: opts
    })
    .then(res => {
      if (res.error) console.log('bad pw: ', res)
      else {
        let stateObj = Object.assign(res.body, userAuth)
        dispatch(loginSuccess(stateObj))
        dispatch(push(``))
      }
    })
  }
}

function loginSuccess (payload) {
  return {
    type: 'LOGIN_SUCCESS',
    userAuth: payload
  }
}

function loginRequest () {
  return {
    type: 'LOGIN_REQUEST'
  }
}

function logout () {
  return { type: 'LOGOUT', null }
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

export { login, logout, locationFound }
