import React from 'react'
import { Link, IndexLink } from 'react-router'
import { connect } from 'react-redux'
import { logout } from '../actions'

const sections = ['users', 'events']

const Navigation = ({state, logout}) => {
  const style = {
    textTransform: 'uppercase',
    display: 'inline-block',
    margin: '0.5em 0.5em'
  }

  return  (
    <div>
      <IndexLink to="/"><h4 style={style}>Home</h4></IndexLink>
      {sections.map( each => <Link  key={each} to={each}><h4 style={style}>{each}</h4></Link>)}
      <input type="button" value="logout" onClick={logout} />
    </div>
  )
}

function mapStateToProps(state) {
  return {state: state}
}



export default connect(mapStateToProps, {logout})(Navigation)
