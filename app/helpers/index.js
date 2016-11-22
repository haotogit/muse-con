import popsicle from 'popsicle'
import * as actions from '../actions'

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

export { popWrap, locateUser }
