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
    const { userAuth, newUser } = this.props

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
            <TextField
              ref='password'
              floatingLabelText='Password'
              type='password'
            /><br />
            { newUser && this.refs.username.input.value != '' ? <input type='password' ref='confirmPassword' placeholder='Confirm Password' /> : '' }
            <RaisedButton
              type='submit'
              label={newUser ? 'Sign Up' : 'Log In'} 
              onClick={(e) => this.login(e)} 
              primary={true}/>
          </form>
          <a data-toggle='collapse' href='#loginInfo' aria-expanded='false' aria-controls='loginInfo'>
            <i className='fa fa-info fa-2x' style={{marginTop:'3%'}}></i>
          </a>
          <div className='collapse' id='loginInfo'>
            <p>Login with an existing username, or type a new username to sign up</p>
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

    if (this.refs.username.input.value != '') this.props.actions.checkUser(username)
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
