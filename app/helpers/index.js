import qString from 'query-string'
import rp from 'request-promise'
import alertify from 'alertify.js'
import config from '../../config/app.config'
import promise from 'bluebird'

function popWrap (reqArgs, dispatch, action) {
  let opts = {
		json: true,
		resolveWithFullResponse: true
  };

  dispatch({ type: 'LOADING', payload: true });
  opts = Object.assign({}, opts, reqArgs);

  return rp(opts)
    .then((resp) => {
      if (action) dispatch(action(resp.body));
      dispatch({ type: 'LOADING', payload: false });
      return resp.body;
    })
    .catch(err => {
      dispatch({ type: 'FAILED REQUEST', payload: err.message });
      dispatch({ type: 'LOADING', payload: false });
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

        popWrap(opts)
          .then(res => resolve(res))
      })
    }
  })
}

function eventLoader (userAuth, list) {
  let latLong = `${userAuth.lat},${userAuth.long}`,
      qParams = {},
      opts,
      reqsArr = []

  qParams = userAuth.searchOpts
  qParams.apikey = config.external.ticketmaster.apiKey

  reqsArr = list.filter(item => !item.exclude)
  return promise.mapSeries(reqsArr, (each, i) => {
    qParams.keyword = each.name
    qParams.countryCode = 'US'

    opts = {
      method: 'GET',
      url: `${config.external.ticketmaster.baseUrl}/events.json?${qString.stringify(qParams)}`,
      json: true
    }

    return rp(opts);
  })
}

// first check for - or \s, if one word cool.tolowercase, but if more than one word, take every word after the first and capitalize and then join that arr 
const keyMaker = (str) => str.replace(/(\+|-|\s)+[a-z]/ig, (m) => m[1].toUpperCase())

export { popWrap, locateUser, eventLoader, keyMaker }
