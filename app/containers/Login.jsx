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

  componentDidMount () {
    this.refs.username.focus()
  }

  render () {
    const { userAuth, newUser } = this.props

    return (
      <div className='wrapper'>
        <div className='container' style={{textAlign:'center', marginTop:'12%'}}>
          <h1 style={{textTransform:'uppercase'}}>{newUser ? 'Sign Up' : 'Login'}</h1>
          <form id='login-form'>
            <input type='text' ref='username' onBlur={() => this.checkUser()} placeholder='Username' />
            <input type='password' ref='password' placeholder='Password' />
            { newUser ? <input type='password' ref='confirmPassword' placeholder='Confirm Password' /> : '' }
            <input type='submit' onClick={(e) => this.login(e)} value={newUser ? 'Sign Up' : 'Log In'} />
          </form>
         </div>
      </div>
    )
  }

  checkUser () {
    let username = { username: this.refs.username.value }

    if (this.refs.username.value != '') this.props.actions.checkUser(username)
  }

  login (e) {
    e.preventDefault()

    const username = this.refs.username.value,
          password = this.refs.password.value,
          opts = {
            username: username, 
            password: password 
          }

    //if (username != '' && password != '') {
      if (!this.props.newUser) this.props.actions.login(opts, this.props)

      if (this.props.newUser && this.refs.confirmPassword.value == password) this.props.actions.userSignup(opts)
    }
  //}
}

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  newUser: state.user.newUser
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
