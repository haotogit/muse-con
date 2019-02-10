import React, { Component } from 'react'
import { login, userSignup, checkUser } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class Login extends Component {

  componentDidMount () {
  }

  render () {
    const { userAuth, newUser, usernameExists } = this.props

    return (
      <div className='wrapper'>
        <div className='container' style={{textAlign:'center', marginTop:'12%'}}>
          <h1 style={{textTransform:'uppercase'}}>{newUser ? 'Sign Up' : 'Login'}</h1>
          <form id='login-form'>
            <TextField
              label='Username'
              autoFocus={true}
              onBlur={(e) => this.checkUser(e)}
            /><br />
            { usernameExists ? <p>Username exists, please another</p> : null }
            <TextField
              label='Password'
              type='password'
            /><br />
            { newUser ? <div><TextField type='password' ref='confirmPassword' floatingLabelText='Confirm Password' /><br /></div> : '' }
            <Button
              variant="contained"
              color="primary"
              style={{marginTop:'2%'}}
              onClick={(e) => this.login(e)}>
              {newUser ? 'Sign Up' : 'Log In'} 
            </Button>
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

  checkUser(e) {
    let username = e.target.value
    if (username != '') this.props.checkUser(username, this.props.userAuth)
  }

  login(e) {
    //const username = this.refs.username.input.value,
    //  password = this.refs.password.input.value,
    const opts = {
        username: 'barry',
        password: 'password'
      //  username: username, 
      //  password: password 
      }

    this.props.login(opts)
      .then((data) => {
        if (data && this.props.userAuth.accessToken) this.props.history.push(`/`)
      })
    //if (!this.props.newUser) this.props.login(opts)
    //if (this.props.newUser && (!this.props.existingUsername && username !== '') && this.refs.confirmPassword.input.value == password) this.props.userSignup(opts)
  }
}

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  newUser: state.user.newUser,
  usernameExists: state.user.usernameExists
})

export default connect(mapStateToProps, { login, userSignup, checkUser })(Login)
