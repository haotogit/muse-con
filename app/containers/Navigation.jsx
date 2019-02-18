import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AccountCircleTwoTone } from '@material-ui/icons'
import { logout } from '../actions'

const sections = ['events']

const styles = () => ({
  linearRoot: {
    width: '100%'
  }
})

const Navigation = ({userAuth, logout, loading, classes}) => {
  const style = {
    textTransform: 'uppercase',
    display: 'inline-block',
    margin: '0.5em 0.5em'
  }

  const routes = ['/', 'explore']

  const progress = () => {
    if (!loading) return null;
    else {
      return (
        <LinearProgress color="primary" classes={{ root: classes.linearRoot }}/>
      )
    }
  }

  return (
    <div>
      <nav className='navbar navbar-inverse navbar-fixed-top' role='navigation'>
        <ul className='nav navbar-right top-nav'>
          <li className='dropdown'>
            <Link to='/user' href='#' className='dropdown-toggle' data-toggle='dropdown'><AccountCircleTwoTone /> {userAuth && userAuth.username ? userAuth.username : 'User'}</Link>
            <ul className='dropdown-menu'>
              <li>
                <Link to='user' to='/user'>Account</Link>
              </li>
              <li className='divider'></li>
              <li>
                <a value='logout' onClick={logout}>Log Out</a>
              </li>
            </ul>
          </li>
        </ul>
        <div className='navbar-header'>
          <Link to='' className='navbar-brand'>MuseCon</Link>
        </div>
        { progress() }
      </nav>


      {/*
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
      </div> subnav */}
    </div>
  )
}

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  loading: state.main.loading,
})

export default connect(mapStateToProps, { logout })(withStyles(styles)(Navigation))
