import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { InfoTwoTone } from '@material-ui/icons'
import {
	Button,
	TextField,
	Container,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles' 
import { 
	login,
	checkUsername,
	userSignup,
} from '../actions'

const styles = () => ({
  cssLabel: {
    color: 'white'
  },
  cssInput: {
    color: 'white',
		borderBottom: '1px solid white'
	},
	mainContain: {
		textAlign: 'center',
		marginTop: '12%',
	}
})

class Login extends Component {
	constructor(props) {
		super(props)
		this.currUsername = React.createRef()
		this.currPw = React.createRef()
		this.confirmPw = React.createRef()
	}

	componentDidMount() {
		this.setState({
			invalidLogin: true
		})
	}

  render () {
		const { 
			userAuth,
			classes,
		} = this.props
		const {
			freshUser,
		} = this.state || {}
    const textFormField = {
      margin: '5px',
      width: '20%'
    }

    return (
      <Container classes={{ root: classes.mainContain }}>
        <h1 style={{textTransform:'uppercase'}}>{freshUser ? 'Sign Up' : 'Login'}</h1>
				<a onClick={() => this.setState(this.toggleSignup)}>{freshUser ? 'Already have an account? Login' : 'No Account? Sign up'}</a>
				<form id='login-form' onSubmit={(e) => this.login(e)}>
          <TextField
						id='currUsername'
            label='Username'
            autoFocus={true}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel
              }
            }}
            InputProps={{
              classes: {
                input: classes.cssInput,
              },
            }}
            style={textFormField}
						inputRef={this.currUsername}
						onChange={(e) => this.updateCreds(e)}
						error={freshUser && freshUser.validUsername === false}
						helperText={freshUser && freshUser.validUsername === false ? 'Username already exists' : null}
          /><br />
          <TextField
						id='currPw'
            label='Password'
            type='password'
            InputLabelProps={{
              classes: {
                root: classes.cssLabel
              }
            }}
            InputProps={{
              classes: {
                input: classes.cssInput,
              },
            }}
            style={textFormField}
						inputRef={this.currPw}
						onChange={(e) => this.updateCreds(e)}
						error={freshUser && freshUser.validPw === false}
						helperText={freshUser && freshUser.validPw === false ? `Passwords don't match` : null}
          /><br />
					{ freshUser ? 
							<React.Fragment>
								<TextField
									id='confirmPw'
									label='Confirm Password'
									type='password'
									InputLabelProps={{
										classes: {
											root: classes.cssLabel
										}
									}}
									InputProps={{
										classes: {
											input: classes.cssInput,
										},
									}}
									style={textFormField}
									inputRef={this.confirmPw}
									onChange={(e) => this.updateCreds(e)}
									error={freshUser && freshUser.validPw === false}
									helperText={freshUser && freshUser.validPw === false ? `Passwords don't match` : null}
								/><br />
							</React.Fragment>
							: null 
					}
          <Button
            color='primary'
						type='submit'
            style={{marginTop:'2%'}}
						disabled={!this.state || this.state.invalidLogin}>
            {freshUser ? 'Sign up' : 'Log in'} 
          </Button>
        </form>
       </Container>
    )
  }

	toggleSubmit(state) {
		return {
			invalidLogin: ((this.currUsername.current && this.currUsername.current.value === '') || (this.currPw.current && this.currPw.current.value === '')) ||
				(state.freshUser && (state.freshUser.validUsername === false || state.freshUser.validPw === false))
		}
	}

	toggleSignup(state) {
		return {
			freshUser: state.freshUser ? null : {}
		}
	}

	updateCreds(e) {
		let currField = e.target.id
		if (this.state.freshUser) {
			if (currField !== 'currUsername') {
				this.setState((state) => {
					return {
						freshUser: Object.assign(state.freshUser, { validPw: this.checkPw() })
					}
				})
			} else if (this.currUsername.current && this.currUsername.current !== '') {
				this.props.checkUsername(this.currUsername.current.value)
					.then(result => {
						this.setState((state) => { 
							return {
								freshUser: Object.assign(state.freshUser, { validUsername: result === null }) 
							}
						})
					})
			}
		}

		this.setState(this.toggleSubmit)
	}

  login(e) {
		e.preventDefault()
		let username = this.currUsername.current.value,
			password = this.currPw.current.value,
			action
		if (username !== '' &&  password !== '') {
			const opts = {
				username,
				password,
			}

			if (!this.state.freshUser) {
				action = this.props.login
			} else if (this.state.freshUser.validUsername && this.state.freshUser.validPw) {
				action = this.props.userSignup
			}
			
			action(opts)
				.then(result => {
					if (result && result.accessToken) {
						this.setState({})
						this.props.history.push(``)
					}
				})
		}
  }

	checkPw() {
		return this.currPw.current.value === this.confirmPw.current.value
	}
}

const mapStateToProps = (state) => ({
  userAuth: state.user.auth,
})

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { 
	login, userSignup, checkUsername
})(withStyles(styles)(Login))
