import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import EventContain from './EventContain'
import { initialize, changeText, updateText } from '../actions'

const Dashboard = ({text, updateText}) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <EventContain />
    </div>
  )
}

Dashboard.propTypes = {
  text: PropTypes.string,
  updateText: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    text: state.reducer.text
  }
}

//function mapDispatchToProps(dispatch){
//  return () => {
//    dispatch(
//  }
//}

export default connect(mapStateToProps, { updateText })(Dashboard)
