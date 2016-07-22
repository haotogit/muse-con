import React, { Component } from 'react'
import { login } from '../actions'
import { connect } from 'react-redux'

const Login = ({state, userLogin}) => {

    return (
      <div>
        <h1>Login</h1>
        <input type='text' id='username' placeholder='Username' />
        <input type='password' id='password' placeholder='Password' />
        <input type='button' onClick={userLogin(event)} value='Login' />
      </div>
    )
}

function mapStateToProps (state) {
  return {state: state}
}

function mapDispatchToProps (dispatch) {
  return {
    userLogin: (event) => {
      console.log(event)
      console.log(this)
      return () => dispatch({type: 'USER_LOGIN'})
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
