import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const sections = ['events']

const Navigation = ({userAuth, logout, loading}) => {
  const style = {
    textTransform: 'uppercase',
    display: 'inline-block',
    margin: '0.5em 0.5em'
  }

  return (
    <nav className='navbar navbar-inverse navbar-fixed-top' role='navigation'>
      <ul className='nav navbar-right top-nav'>
        <li className='dropdown'>
          <Link to='/user' href='#' activeClassName='active' className='dropdown-toggle' data-toggle='dropdown'><i className='fa fa-user'></i> {userAuth.username || 'User'}</Link>
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
    </nav>
  )
}

export default Navigation
