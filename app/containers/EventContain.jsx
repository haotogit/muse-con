import * as actions from '../actions'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBlock from '../components/EventBlock'
import Lists from '../components/Lists'

class EventContain extends Component {
  componentDidMount() {
    if (!this.props.events || !this.props.events.searchList ||
        this.props.events.searchList == 0) 
        this.props.actions.setSearchList(this.props.userAuth[this.props.userAuth.searchOpts.by])
  }
  componentDidUpdate(prevProps) {
    
  }

  render () {
    return (
      <div className='container-fluid content-container'>
        <Lists {...this.props}/>
        
        {this.props.events ? <EventBlock {...this.props} /> : ''}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.event.events,
    searchList: state.event.searchList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventContain)
