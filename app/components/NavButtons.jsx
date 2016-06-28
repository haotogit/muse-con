import React, { PropTypes } from 'react'

const NavButtons = ({buttons}) => {
  return  buttons.map( button => <h1>{button}</h1>)
}

NavButtons.propTypes = {
  buttons: PropTypes.array.required
}

export default NavButtons
