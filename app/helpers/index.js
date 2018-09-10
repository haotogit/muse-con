import popsicle from 'popsicle'
import qString from 'query-string'
import rp from 'request-promise'
import alertify from 'alertify.js'
import config from '../app.config'
import { userUpdate } from '../actions'

function popWrap (reqArgs, dispatch, action) {
  let opts = {
    json: true,
  };

  if (dispatch) dispatch({ type: 'LOADING', payload: true });
  opts = Object.assign({}, opts, reqArgs);

  return rp(opts)
    .then((data) => {
      if (dispatch) {
        if (action) dispatch(action(data));
        dispatch({ type: 'LOADING', payload: false });
      }
      return data;
    })
    .catch(err => {
      alertify.alert(err.message);
      dispatch({ type: 'FAILED REQUEST', payload: err });
      dispatch({ type: 'LOADING', payload: false });

      if(err.response.body.error && 
        err.response.body.error === 'TokenExpiredError: jwt expired') dispatch(userUpdate({}));
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

function eventLoader (userAuth, list, dispatch) {
  let latLong = `${userAuth.lat},${userAuth.long}`,
      qParams = {},
      opts,
      reqsArr = []

  qParams = userAuth.searchOpts
  qParams.apikey = config.external.ticketmaster.apiKey
  qParams.radius = 50

  reqsArr = list.filter(item => !item.exclude)
    .map((each, i) => {
      qParams.keyword = each.name

      opts = {
        method: 'GET',
        url: `${config.external.ticketmaster.baseUrl}/events.json?${qString.stringify(qParams)}`
      }

      return popWrap(opts, dispatch)
    })

  return Promise.all(reqsArr)
}

// first check for - or \s, if one word cool.tolowercase, but if more than one word, take every word after the first and capitalize and then join that arr 
const keyMaker = (str) => str.replace(/(\+|-|\s)+[a-z]/ig, (m) => m[1].toUpperCase())

export { popWrap, locateUser, eventLoader, keyMaker }
