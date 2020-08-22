import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { CalendarTodayTwoTone } from '@material-ui/icons'
import { Container } from '@material-ui/core'

import { getUserEvents, saveEvent } from '../actions'
import { locateUser } from '../helpers'
import Lists from '../components/Lists'
import Navbar from '../components/Navbar'
import EventBlock from '../components/EventBlock'
import ImgList from '../components/ImgList'

class Dashboard extends Component {
	static getContainerStateScope() {
		return {
			props: (state) => {
				return {
					events: state.userEvents,
				}
			},
			actions: (dispatch) => {
				return {
					getUserEvents,
					saveEvent,
				}
			}
		}
	}
  // to touch nested children of state tree,
  // assign new properties to highest affected level,
  // then reassign to state by using same key
  
  componentDidMount() {
		//this.props.getUserEvents(this.props.userAuth);
		console.log(this.props)
  }

	getCurrView() {
		return this.props.location.pathname.replace(/\//, '')
	}

  render(){
    let checkUser = (user) => {
      if (!user.thirdParties || user.thirdParties.length === 0) {
        return <span className='label label-warning'><Link to='/user'>Link your Spotify Account</Link></span>
      } else if(this.props.events && this.props.events.length !== 0) {
        return <h6 style={{textTransform:'lowercase',marginLeft:'2%'}}>Upcoming Events<Badge badgeContent={this.props.events.length} color='secondary'><CalendarTodayTwoTone /></Badge></h6>
      } else return <h6>No upcoming events <Link to='/explore'>search for events</Link></h6>
    } 

    return (
			<ImgList currView={this.getCurrView()} />
    )
  }
}

export default Dashboard
