import React, { Component } from 'react'
import { login, userSignup, checkUser } from '../actions'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'; 
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { InfoTwoTone } from '@material-ui/icons'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = () => ({
  cssLabel: {
    color: 'white'
  },
  cssOutlinedInput: {
    color: 'white'
  },
  inputRoot: {
    'fieldset': {
      borderColor: 'white'
    }
  }
});

class Login extends Component {
  componentDidUpdate() {
  }

  render () {
    const { userAuth, newUser, usernameExists, classes } = this.props
    const textFormField = {
      margin: '5px',
      width: '20%'
    };

    return (
      <div className='container' style={{textAlign:'center', marginTop:'12%'}}>
        <h1 style={{textTransform:'uppercase'}}>{newUser ? 'Sign Up' : 'Login'}</h1>
        <form id='login-form'>
          <TextField
						id='standard-basic'
            label='Username'
            variant='outlined'
            autoFocus={true}
            //onBlur={(e) => this.checkUser(e)}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel
              }
            }}
            InputProps={{
              classes: {
                input: classes.cssOutlinedInput,
              },
            }}
            style={textFormField}
          /><br />
          { usernameExists ? <p>Username exists, please another</p> : null }
          <TextField
						id='standard-basic'
            label='Password'
            type='password'
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel
              }
            }}
            InputProps={{
              classes: {
                input: classes.cssOutlinedInput,
              },
            }}
            style={textFormField}
          /><br />
          { newUser ? <div><TextField type='password' ref='confirmPassword' floatingLabelText='Confirm Password' /><br /></div> : '' }
          <Button
            variant='outlined'
            color='primary'
            style={{marginTop:'2%'}}
            onClick={(e) => this.login(e)}>
            {newUser ? 'Sign Up' : 'Log In'} 
          </Button>
        </form>
        <a data-toggle='collapse' href='#loginInfo' aria-expanded='false' aria-controls='loginInfo'>
          <InfoTwoTone />
        </a>
        <div className='collapse' id='loginInfo'>
          <p>Login with an existing username, or <a onClick={() => this.props.actions.newUser(true)}>sign up</a></p>
          <hr style={{width:'30%',border:'2px solid'}}></hr>
          <h6>DEMO LOGIN</h6>
          <p>USERNAME: demo</p>
          <p>PW: pw</p>
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
  userAuth: state.user.auth,
  newUser: state.user.newUser,
  usernameExists: state.user.usernameExists
})

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { login, userSignup, checkUser })(withStyles(styles)(Login))
