import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import EventContain from './EventContain'
import * as actionCreators from '../actions'
import { bindActionCreators } from 'redux'
import popsicle from 'popsicle'
import UserTaste from '../components/UserTaste'

class Dashboard extends Component{

  componentWillMount () {
    if (this.props.userAuth.username && !this.props.userAuth.spotify['genres']) {
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

     this.props.userAuth.spotify['genres'].sort(this.sortArr) 
    }
  }

  componentDidMount () {
     
  }

  render(){
    return (
      <div className='container'>
        <h1>Wilkommen</h1>
        <h4>Need event module, which is calendar and list view</h4>
        <UserTaste spotify={this.props.userAuth.spotify}/>
      </div>
    )
  }

  sortArr (a, b) {
    if (a.value > b.value) {
      return -1
    }

    if (a.value < b.value) {
      return 1
    }

    return 0
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
