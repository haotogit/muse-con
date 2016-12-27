import * as actions from '../actions'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBlock from '../components/EventBlock'
import Lists from '../components/Lists'
 

const EventContain = ({ userAuth, actions, events }) => {
  let styles = {
    height: '30em',
    padding: '1em',
    overflow: 'auto',
    border: '2px solid black'
  }

  $('body').scrollspy({
      target: '.bs-docs-sidebar',
      offset: 40
  });

  return (
    <div className='row' style={styles}>
      <Lists userAuth={userAuth} events={events}/>

      <button onClick={() => actions.loadEvents(userAuth)}>hello</button>

      {events ? <EventBlock events={events} /> : ''}
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
