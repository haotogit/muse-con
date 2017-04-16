import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push, routerActions } from 'react-router-redux'
import Navigation from './Navigation'

export function requireAuth (Comp) {
  class AuthedComp extends Component {

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
        marginTop: '5%',
        position:'relative'
      }

      const routes = ['', 'explore']

      return (
        <div className='container' style={containerStyle}>
          <div className='row' style={{position:'fixed',width:'100%',right:'0',left:'3%',zIndex:'1000'}}>
            <ul style={{display:'flex',padding:'0'}}>
              {
                routes.map(route => 
                  <li key={route} style={{width:'8em',padding:'1em'}}>
                    <Link key={route} 
                      to={route} 
                      className='subnav-link'
                      activeClassName='active'>
                      {route == '' ? 'dashboard' : route}
                    </Link>
                  </li>
                )
              }
            </ul>
            
          </div>
          { this.props.userAuth.username ?
            <Comp {...this.props}/>
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
