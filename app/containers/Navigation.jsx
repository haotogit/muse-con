import React from 'react'
import { Link, IndexLink } from 'react-router'

const sections = ['users']

const Navigation = () => {
  const style = {
    textTransform: 'uppercase',
    display: 'inline-block',
    margin: '0.5em 0.5em'
  }

  return  (
    <div>
      <IndexLink to="/"><h4 style={style}>Home</h4></IndexLink>
      {sections.map( each => <Link  key={each} to={each}><h4 style={style}>{each}</h4></Link>)}
    </div>
  )
}

export default Navigation
