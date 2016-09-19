import React from 'react'
import { connect } from 'react-redux'
import { push, routerActions } from 'react-router-redux'
import Navigation from './Navigation'

export function requireAuth (Component) {
  class AuthedComp extends Component{

    componentWillMount () {
      if (!this.props.userAuth) {
        this.authenticate(this.props)
      }
    }

    componentWillReceiveProps (nextProps) {
      this.authenticate(nextProps)
    }

    authenticate (props) {
      if (!props.userAuth) {
        return props.dispatch(routerActions.push(`/login`))
      }

    }

    render () {
      return (
        <div>
          { this.props.userAuth ?
            ( <div>
                <Component {...this.props} />
              </div>
            ) : null }
        </div>
      )
    }

  }
  const mapStateToProps = (state) => ({
    //token: state.reducer.auth.token,
    //userName: state.reducer.auth.userName,
    userAuth: state.reducer.userAuth
  })

  return connect(mapStateToProps)(AuthedComp)

}


