import popsicle from 'popsicle'
import * as actions from '../actions'
import qString from 'query-string'

function popWrap (...args) {
  let optsArr = ['method', 'url', 'body'],
      opts = {}

  optsArr.forEach((each, i) => {
    opts[each] = args[i]
  })

  return popsicle(opts)
}

function locateUser (currUser) {

  return new Promise(resolve => {
    let latLong,
        userObj,
        opts = {
          method: 'post',
          url: '/api/users'
        }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        latLong = {
          lat: pos.coords.latitude,
          long: pos.coords.longitude
        }
        userObj = Object.assign(currUser, latLong)

        opts.body = latLong

        popsicle(opts)

        resolve(userObj)
      })
    }
  })
}

function eventLoader (userAuth) {
  let latLong = `${userAuth.lat},${userAuth.long}`,
      qParams,
      opts,
      reqsArr = []

  qParams = userAuth.tixMaster.searchOpts

  userAuth[userAuth.tixMaster.currSrc][userAuth.tixMaster.searchOpts.by].forEach((each, i) => {
    if (i < 10) {
      if (!each.exclude) {
        qParams.keyword = each.name
      } 

      opts = {
        method: 'GET',
        url: `${process.env.TICKETMASTER_URL}/discovery/v2/events.json?${qString.stringify(qParams)}`
      }

      reqsArr.push(popsicle(opts))
    } 
  })

  return Promise.all(reqsArr)
}

export { popWrap, locateUser, eventLoader }
