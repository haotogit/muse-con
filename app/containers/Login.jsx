import React, { Component } from 'react'
import * as actionCreators from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Login extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  render () {
    const { userAuth, newUser } = this.props

    return (
      <div className='wrapper'>
        <h1>Login</h1>
        <form>
          <input type='text' ref='username' onBlur={() => this.checkUser()} placeholder='Username' />
          <input type='password' ref='password' placeholder='Password' />
          { newUser ? <input type='password' ref='confirmPassword' placeholder='Confirm Password' /> : '' }
          <input type='button' onClick={() => this.login()} value={newUser ? 'Sign Up' : 'Log In'} />
        </form>
      </div>
    )
  }

  checkUser () {
    let username = { username: this.refs.username.value }

    if (this.refs.username.value != '') this.props.actions.checkUser(username)
  }

  login () {
    const username = this.refs.username.value,
          password = this.refs.password.value,
          opts = {
            //password: password.value
            username: 'jack', 
            password: 'password'
          }

    //if (username != '' && password != '') {
      if (!this.props.newUser) this.props.actions.login(opts, this.props)

      if (this.props.newUser && this.refs.confirmPassword.value == password) this.props.actions.userSignup(opts)
    //}
  }
}

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  newUser: state.user.newUser
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
