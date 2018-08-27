import React from 'react'
import { Link, IndexLink } from 'react-router'
import { connect } from 'react-redux'
import { logout } from '../actions'

const sections = ['events']

const Navigation = ({userAuth, logout, loading}) => {
  const style = {
    textTransform: 'uppercase',
    display: 'inline-block',
    margin: '0.5em 0.5em'
  }

  return  userAuth.username ? (
    <nav className='navbar navbar-inverse navbar-fixed-top' role='navigation'>
      <ul className='nav navbar-right top-nav'>
        <li className='dropdown'>
          <Link to='/user' href='#' activeClassName='active' className='dropdown-toggle' data-toggle='dropdown'><i className='fa fa-user'></i> {userAuth.username || 'User'}</Link>
          <ul className='dropdown-menu'>
            <li>
              <Link key='user' to='user'>Account</Link>
            </li>
            <li className='divider'></li>
            <li>
              <a value='logout' onClick={logout}>Log Out</a>
            </li>
          </ul>
        </li>
      </ul>
      <div className='navbar-header'>
        <IndexLink className='navbar-brand' to=''>MuseCon</IndexLink>
      </div>
    </nav>
  ) : null
}

function mapStateToProps(state) {
  return {
    userAuth: state.user.userAuth,
    loading: state.main.loading
  }
}

export default connect(mapStateToProps, {logout})(Navigation)
