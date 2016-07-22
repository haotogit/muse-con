import React from 'react'
import { connect } from 'react-redux'
import { push, routerActions } from 'react-router-redux'
import Navigation from './Navigation'

export function requireAuth (Component) {
  class AuthedComp extends Component{

    componentWillMount () {
      if (!this.props.isAuthed) {
        this.authenticate(this.props, this.props.location, this.props.location.pathname)
      }
    }

    componentWillReceiveProps (nextProps) {
      this.authenticate(nextProps, nextProps.location, nextProps.location.pathname)
    }

    authenticate (props, location, nextLocation) {
      if (!props.isAuthed) {
        return props.dispatch(routerActions.replace(`/login?next=${nextLocation}`))
      }
    }

    render () {
      return (
        <div>
          { this.props.isAuthed ?
            ( <div>
                <Navigation />
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
    isAuthed: state.reducer.isAuthed,
    state: state
  })

  return connect(mapStateToProps)(AuthedComp)

}


