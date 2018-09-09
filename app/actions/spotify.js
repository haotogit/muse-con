import { popWrap } from '../helpers'
import { push, routerActions } from 'react-router-redux'
import { userUpdate } from './user'
import urlLib from 'url'
const config = require('../../server/config/config');
import qString from 'query-string'

const BASE_PATH = urlLib.format(config.app.api);

function analyzeSpotify (user) {
  return (dispatch) => {
    popWrap({ 
      method: 'GET',
      url: `${BASE_PATH}/users/${user._id}/evalSpotify`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    }, dispatch)
    .then((resp) => {
      user.thirdParties[0] = resp;
      dispatch(userUpdate(user));
    });
  }
}

export { analyzeSpotify }
