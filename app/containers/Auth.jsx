import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push, routerActions } from 'react-router-redux'
import Navigation from './Navigation'

export function requireAuth (Component) {
  class AuthedComp extends Component{

    componentWillMount () {
      if (!this.props.userAuth.username) {
        this.authenticate(this.props)
      }
    }

    componentWillReceiveProps (nextProps) {
      this.authenticate(nextProps)
    }

    authenticate (props) {
      if (!props.userAuth.username) {
        return props.dispatch(routerActions.push(`/login`))
      }
    }

    render () {
      let containerStyle = {
        height: '38em',
        border: '1px solid black'
      }

      const routes = ['', 'explore']

      return (
        <div className='container' style={containerStyle}>
          <div className='row' style={{border:'1px solid'}}>
            <ul>
              {
                routes.map(route => 
                  <li key={route}>
                    <Link key={route} to={route}>{route == '' ? 'dashboard' : route}</Link>
                  </li>
                )
              }
            </ul>
            
          </div>
          { this.props.userAuth.username ?
            <Component {...this.props} />
            : null }
        </div>
      )
    }

  }
  const mapStateToProps = (state) => ({
    userAuth: state.user.userAuth
  })

  return connect(mapStateToProps)(AuthedComp)

}
