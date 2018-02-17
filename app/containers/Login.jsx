import React, { Component } from 'react'
import * as actionCreators from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


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
    const { userAuth, newUser, usernameExists } = this.props

    return (
      <div className='wrapper'>
        <div className='container' style={{textAlign:'center', marginTop:'12%'}}>
          <h1 style={{textTransform:'uppercase'}}>{newUser ? 'Sign Up' : 'Login'}</h1>
          <form id='login-form'>
            <TextField
              ref='username'
              floatingLabelText='Username'
              onBlur={() => this.checkUser()}
            /><br />
            { usernameExists ? <p>Username exists, please another</p> : null }
            <TextField
              ref='password'
              floatingLabelText='Password'
              type='password'
            /><br />
            { newUser ? <div><TextField type='password' ref='confirmPassword' floatingLabelText='Confirm Password' /><br /></div> : '' }
            <RaisedButton
              type='submit'
              label={newUser ? 'Sign Up' : 'Log In'} 
              style={{marginTop:'2%'}}
              onClick={(e) => this.login(e)} 
              primary={true}/>
          </form>
          <a data-toggle='collapse' href='#loginInfo' aria-expanded='false' aria-controls='loginInfo'>
            <i className='fa fa-info fa-2x' style={{marginTop:'3%'}}></i>
          </a>
          <div className='collapse' id='loginInfo'>
            <p>Login with an existing username, or <a onClick={() => this.props.actions.newUser(true)}>sign up</a></p>
            <hr style={{width:'30%',border:'2px solid'}}></hr>
            <h6>DEMO LOGIN</h6>
            <p>USERNAME: demo</p>
            <p>PW: pw</p>
          </div>
         </div>
      </div>
    )
  }

  checkUser () {
    let username = { username: this.refs.username.input.value }

    if (this.newUser && this.refs.username.input.value != '') this.props.actions.checkUser(username, this.props.userAuth)
  }

  login (e) {
    e.preventDefault()

    const username = this.refs.username.input.value,
          password = this.refs.password.input.value,
          opts = {
            username: username, 
            password: password 
          }

    //if (username != '' && password != '') {
      if (!this.props.newUser) this.props.actions.login(opts)

      if (this.props.newUser && (!this.props.existingUsername && username !== '') && this.refs.confirmPassword.input.value == password) this.props.actions.userSignup(opts)
    }
  //}
}

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  newUser: state.user.newUser,
  usernameExists: state.user.usernameExists
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
