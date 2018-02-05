import popsicle from 'popsicle'
import * as actions from '../actions'
import qString from 'query-string'
import rp from 'request-promise'
import alertify from 'alertify.js'

function popWrap (reqArgs, dispatch, action) {
  let opts = {
    json: true
  };

  opts = Object.assign(opts, reqArgs);

  return rp(opts)
    .then((data) => {
      dispatch(action(data));
    })
    .catch(err => {
      alertify.alert(err.message);
      dispatch({ type: 'FAILED REQUEST', payload: err });
    });
}

function locateUser (currUser) {

  return new Promise(resolve => {
    let latLong,
        userObj,
        opts = {
          method: 'put',
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
          .then(res => resolve(res.body))
      })
    }
  })
}

function eventLoader (userAuth, list) {
  let latLong = `${userAuth.lat},${userAuth.long}`,
      qParams,
      opts,
      reqsArr = []

  qParams = userAuth.searchOpts
  qParams.apikey = process.env.TICKETMASTER_KEY
  qParams.radius = 50

  reqsArr = list.filter(item => !item.exclude)
    .map((each, i) => {
      qParams.keyword = each.name

      opts = {
        method: 'GET',
        url: `${process.env.TICKETMASTER_URL}/events.json?${qString.stringify(qParams)}`
      }

      return popsicle(opts)
    })

  return Promise.all(reqsArr)
}

// first check for - or \s, if one word cool.tolowercase, but if more than one word, take every word after the first and capitalize and then join that arr 
const keyMaker = (str) => str.split(/\-|\s/).length === 1 ? str.toLowerCase() : str.split(/\-|\s/).map((each, i) => i === 0 ? each.toLowerCase() : each.replace(each[0], (match) => match.toUpperCase())).join('')

export { popWrap, locateUser, eventLoader, keyMaker }
