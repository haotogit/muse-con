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
    const { userAuth } = this.props

    return (
      <div className='wrapper'>
        <h1>Login</h1>
        <form>
          <input type='text' ref='username' placeholder='Username' />
          <input type='password' ref='password' placeholder='Password' />
          <input type='button' onClick={() => this.login()} value='Login' />
        </form>
      </div>
    )
  }

  login () {
    const username = this.refs.username,
          password = this.refs.password,
          opts = {
            //username: username.value,
            //password: password.value
            username: 'samuca',
            password: 'password'
          }

    this.props.actions.login(opts, this.props.userAuth)
  }
}

const mapStateToProps = (state) => ({
  userAuth: state.reducer.userAuth
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
