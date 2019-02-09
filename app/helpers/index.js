import popsicle from 'popsicle'
import qString from 'query-string'
import rp from 'request-promise'
import alertify from 'alertify.js'
import config from '../../config/app.config'
import promise from 'bluebird'

function popWrap (reqArgs, dispatch, action) {
  let opts = {
    json: true,
  };

  dispatch({ type: 'LOADING', payload: true });
  opts = Object.assign({}, opts, reqArgs);

  return rp(opts)
    .then((data) => {
      if (action) dispatch(action(data));
      dispatch({ type: 'LOADING', payload: false });
      return data;
    })
    .catch(err => {
      dispatch({ type: 'FAILED REQUEST', payload: err.message });
      //dispatch({ type: 'LOADING', payload: false });
      alertify.alert(err.message);
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

  reqsArr = list.filter(item => !item.exclude)
  return promise.map(reqsArr, (each, i) => {
    qParams.keyword = each.name
    qParams.countryCode = 'US'

    opts = {
      method: 'GET',
      url: `${config.external.ticketmaster.baseUrl}/events.json?${qString.stringify(qParams)}`
    }

    return popWrap(opts, dispatch, null)
  })
}

// first check for - or \s, if one word cool.tolowercase, but if more than one word, take every word after the first and capitalize and then join that arr 
const keyMaker = (str) => str.replace(/(\+|-|\s)+[a-z]/ig, (m) => m[1].toUpperCase())

export { popWrap, locateUser, eventLoader, keyMaker }
