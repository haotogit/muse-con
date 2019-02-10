import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Authorizer (Comp) {
  class AuthedComp extends Component {

    componentWillMount() {
      this.authenticate(this.props)
    }

    componentWillReceiveProps(nextProps) {
      this.authenticate(nextProps)
    }

    authenticate(props) {
      // need to refactor to consider token expiration
      if (!props.userAuth.username && !props.userAuth.accesToken) this.props.history.push(`/login`);
    }

    render() {
      let containerStyle = {
        marginTop: '5%',
        position:'relative'
      }

      const routes = ['/', 'explore']
      return (
        <div className='container-fluid'>
          { /*
              this.props.loading ? <LinearProgress mode='indeterminate' style={{backgroundColor:'none',overflow:'hidden',position:'fixed',left:'0',top:'6%',width:'100%'}} /> : ''
              */ }
          <div className='row' style={{position:'fixed',width:'100%',zIndex:'1000',left:'1%',top:'10%'}}>
            <ul style={{display:'flex'}}>
              {
                routes.map(route => 
                  <li key={route} style={{width:'8em',padding:'1em'}}>
                    <Link to={route} 
                      className='subnav-link'
                      activeclassname={this.props.location.pathname === route ? 'active' : ''}>
                      {route === '/' ? 'dashboard' : route}
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
    userAuth: state.user.userAuth,
    loading: state.main.loading
  })

  return connect(mapStateToProps)(AuthedComp)
}
