import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { bindActionCreators } from 'redux'
import Lists from '../components/Lists'

const EventContain = ({ userAuth, actions }) => {
  let styles = {
    height: "30em",
    padding: "1em",
    overflow: "auto",
    border: "2px solid black"
  }

  return (
    <div style={styles}>
      <button>hello</button>

      <Lists thirdParty={userAuth.spotify}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userAuth: state.reducer.userAuth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventContain)
