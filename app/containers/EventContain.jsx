import * as actions from '../actions'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
 

const EventContain = ({ userAuth, actions, events }) => {
  let styles = {
    height: "30em",
    padding: "1em",
    overflow: "auto",
    border: "2px solid black"
  }

  return (
    <div className='container' style={styles}>
      <button onClick={() => actions.loadEvents(userAuth)}>hello</button>
      {events ? Object.keys(events).map(each => <p key={each}>{each}</p>) : ''}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userAuth: state.reducer.userAuth,
    events: state.reducer.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventContain)
