import React from 'react'
import { connect } from 'react-redux'
import { loadEvents } from '../actions'
import { bindActionCreators } from 'redux'

const EventContain = ({ events }) => {
  let styles = {
    height: "19em",
    width: "18em",
    padding: "2em",
    overflow: "auto",
    border: "2px solid black"
  }

  return (
    <div style={styles}>
      <h1>EventContain</h1>
      {events ? Object.keys(events).map( key => <p key={key}>{key}: {events[key]}</p>) : 'Loading'}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    events: state.reducer.events
  }
}

//const mapDispatchToProps = (dispatch) => {
//  return {
//    load: (payload) => dispatch(loadEvents(payload))
//  }
//}

export default connect(mapStateToProps)(EventContain)
