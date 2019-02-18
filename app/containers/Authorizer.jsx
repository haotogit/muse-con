import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'

export default function Authorizer (Comp) {
  class AuthedComp extends Component {
    componentDidMount() {
      this.authenticate()
    }

    componentDidUpdate(prevProps) {
      this.authenticate()
    }

    authenticate() {
      // need to refactor to consider token expiration
      // also make a request to validate token
      if (!this.props.userAuth.accessToken) this.props.history.push(`/login`);
    }

    render() {
      let containerStyle = {
        marginTop: '5%',
        position:'relative'
      }

      const routes = ['/', 'explore']
      return (
        <div className='container-fluid'>
          <div className='row' style={{position:'fixed',width:'100%',zIndex:'1000',left:'1%',top:'10%'}}>
            <ul style={{display:'flex'}}>
              {
                routes.map(route => 
                  <li key={route} style={{width:'8em',padding:'1em'}}>
                    <Link to={route}>
                      {route === '/' ? 'dashboard' : route}
                    </Link>
                  </li>
                )
              }
            </ul>
          </div>
          { /*
              this.props.loading ? <LinearProgress mode='indeterminate' style={{backgroundColor:'none',overflow:'hidden',position:'fixed',left:'0',top:'6%',width:'100%'}} /> : ''
              */ }
          

          { this.props.userAuth.accessToken ? <Comp {...this.props}/> : null }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    userAuth: state.user.userAuth,
    loading: state.main.loading,
    events: state.user.events,
  })

  return connect(mapStateToProps)(AuthedComp)
}
