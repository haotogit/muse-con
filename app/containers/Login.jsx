import React, { Component } from 'react'
import { login } from '../actions'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'

class Login extends Component {
  constructor (props) {
    super(props)
    this.dispatch = props.dispatch
    this.state = props.state
    this.isAuthed = this.props.isAuthed
    console.log('porra', props)
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input type='text' ref='username' placeholder='Username' />
          <input type='password' ref='password' placeholder='Password' />
          <input type='button' onClick={(event) => this.sendLogin(event)} value='Login' />
          <p>{this.isAuthed ? this.isAuthed : 'nope'}</p>
        </form>
      </div>
    )
  }

  sendLogin (event) {
    const username = this.refs.username,
          password = this.refs.password,
          opts = {
            username: username.value,
            password: password.value
          }
    this.props.dispatch({type: 'USER_LOGIN', opts})
    //this.props.dispatch(routerActions.replace(''))
  }
}

const mapStateToProps = (state) => ({
  state: state,
  isAuthed: state.reducer.isAuthed
})

export default connect(mapStateToProps)(Login)
