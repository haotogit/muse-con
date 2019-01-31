import * as actions from '../actions'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EventBlock from '../components/EventBlock'
import Lists from '../components/Lists'
import LinearProgress from 'material-ui/LinearProgress'

class EventContain extends Component {

  componentWillReceiveProps (props) {
    
  }

  componentWillMount() {
    this.props.actions.setSearchList(this.props.userAuth[this.props.userAuth.searchOpts.by])
  }

  render () {

    return (
      <div className='row content-contain'>
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
