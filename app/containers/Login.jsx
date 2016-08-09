import React, { Component } from 'react'
import * as actionCreators from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Login extends Component {
  constructor (props) {
    super(props)
  }

  componentWillReceiveProps (nextProps) {
  }

  render () {
    let { state, userAuth } = this.props

    return (
      <div>
        <h1>Login</h1>
        <form>
          <input type='text' ref='username' placeholder='Username' />
          <input type='password' ref='password' placeholder='Password' />
          <input type='button' onClick={this.login.bind(this)} value='Login' />
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
            username: 'test',
            password: 'password'
          }

    this.props.actions.login(opts)
  }
}

const mapStateToProps = (state) => ({
  userAuth: state.reducer.userAuth
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
