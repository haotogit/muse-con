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
      if (res.error) console.log('bad pw: ', res)
      else {
        dispatch(loginSuccess(res.body))
        dispatch(tixMasterOpts(res.body))
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

function tixMasterOpts (currUser) {
  console.log('hallo', currUser)
  let opts = currUser

  return (dispatch) => dispatch({type: 'TIX_MASTER_OPTS', opts})
  
}



export { login, logout, locationFound }
