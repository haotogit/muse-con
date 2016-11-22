import React from 'react'
import { connect } from 'react-redux'
import { loadEvents } from '../actions'
import { bindActionCreators } from 'redux'

const EventContain = ({ events }) => {
  let styles = {
    height: "30em",
    padding: "1em",
    overflow: "auto",
    border: "2px solid black"
  }

  return (
    <div style={styles}>
      <button>hello</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(EventContain)
