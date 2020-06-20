import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'

export default function Authorizer (Comp) {
  class AuthedComp extends Component {
    componentDidMount() {
			console.log('faaaaaaaaakkk');
      this.authenticate()
    }

    componentDidUpdate(prevProps) {
			console.log('faaaaaaaaakkkupdate');
      this.authenticate()
    }

    authenticate() {
      // need to refactor to consider token expiration
      // also make a request to validate token
      if (!this.props.userAuth || !this.props.userAuth.accessToken) this.props.history.push(`/login`);
    }

    render() {
      let containerStyle = {
        marginTop: '5%',
        position:'relative'
      }

      return (
				<React.Fragment>
					{ this.props.userAuth && this.props.userAuth.accessToken ? <Comp {...this.props}/> : null }
				</React.Fragment>
      )
    }
  }

	const containerScope = Comp.getContainerStateScope();
	const mapStateToProps = (state) => (Object.assign({}, {
			userAuth: state.user.auth,
			loading: state.main.loading,
  	}, containerScope.props(state)));
	const mapDispatchToProps = (dispatch) => containerScope.actions();

  return connect(mapStateToProps, mapDispatchToProps())(AuthedComp);
}
