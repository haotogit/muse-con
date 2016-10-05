import popsicle from 'popsicle'
import { push, routerActions } from 'react-router-redux'

function login(opts){
  return (dispatch) => {
    dispatch(loginRequest())
    popsicle({
      method: 'post',
      url: 'http://localhost:3000/api/authenticate',
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
  return { type: 'LOGOUT', null }
}

export { login, logout }
