import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import EventContain from './EventContain'
import * as actionCreators from '../actions'
import { bindActionCreators } from 'redux'
import popsicle from 'popsicle'
import UserTaste from '../components/UserTaste'

class Dashboard extends Component{
  constructor (props) {
    super()
  }

  componentWillMount () {
    if (this.props.userAuth.username) {
      let spotify = this.props.userAuth.spotify
      let genresObj = {}
      let currIndex
      this.props.userAuth.spotify['genres'] = []
      spotify['artists'].forEach(each => {
        each['genres'].forEach(genre => {
        if (this.props.userAuth.spotify['genres'].find(obj => obj.label === genre)) {
          currIndex = this.props.userAuth.spotify['genres'].findIndex(obj => obj.label === genre)
          this.props.userAuth.spotify['genres'][currIndex].value++
        }
          else this.props.userAuth.spotify['genres'].push({ label: genre, value: 1 })
        })
      })

    }
  }

  componentDidMount () {
     
  }

  render(){
  
    return (
      <div className='container'>
        <h1>Wilkommen</h1>
        <h4>Need event module, which is calendar and list view</h4>
        <p>Adding</p>
        <UserTaste spotify={this.props.userAuth.spotify}/>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  text: state.reducer.text,
  userAuth: state.reducer.userAuth
})

const mapDispatchToProps = (dispatch) => ({
  doAuth: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
