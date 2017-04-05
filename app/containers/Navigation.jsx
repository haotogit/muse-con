import React from 'react'
import { Link, IndexLink } from 'react-router'
import { connect } from 'react-redux'
import { logout } from '../actions'

const sections = ['events']

const Navigation = ({userAuth, logout}) => {
  const style = {
    textTransform: 'uppercase',
    display: 'inline-block',
    margin: '0.5em 0.5em'
  }

  return  userAuth.username ? (
    <nav className='navbar navbar-inverse navbar-fixed-top' role='navigation'>
      <ul className='nav navbar-right top-nav'>
        <li className='dropdown'>
          <a href='#' className='dropdown-toggle' data-toggle='dropdown'><i className='fa fa-user'></i> {userAuth.username || 'User'} <b className='caret'></b></a>
          <ul className='dropdown-menu'>
            <li>
              <Link key='user' to='user' activeClassName='active'>Account</Link>
            </li>
            <li className='divider'></li>
            <li>
              <a value='logout' onClick={logout}>Log Out</a>
            </li>
          </ul>
        </li>
      </ul>
      <div className='navbar-header'>
        <IndexLink className='navbar-brand' to=''>dashboard</IndexLink>
      </div>
    </nav>
  ) : null
}

function mapStateToProps(state) {
  return {
    userAuth: state.user.userAuth
  }
}

export default connect(mapStateToProps, {logout})(Navigation)
