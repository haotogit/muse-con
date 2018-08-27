const popsicle = require('popsicle');
const promise = require('bluebird');
const urlLib = require('url');
const config = require('../../server/config/config');

const API_BASE_PATH = urlLib.format(config.app.api);

module.exports.spotifyRequestResolver = (spotifyObj, spotifyOpts) => {
  let refresherOpts, nextItem, authParam;
  return popsicle.request(spotifyOpts)
    .then((data) => {
      if (data.body.items) return data;
      else if (data.body.error && data.body.error.message === 'The access token expired') {
        authParam = new Buffer(`${config.external.spotify.clientId}:${config.external.spotify.clientSecret}`).toString('base64');

        refresherOpts = [
          {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
              Authorization: `Basic ${authParam}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: {
              grant_type: 'refresh_token',
              refresh_token: spotifyObj.refreshToken
            }
          },
          spotifyOpts,
          {
            method: 'put',
            // need to change to BASE_PATH
            url: `${API_BASE_PATH}/users/${spotifyObj.userId}/thirdparty/${spotifyObj._id}`
          }
        ];

        return promise.mapSeries(refresherOpts, (value, i) => {
          return popsicle.request(value)
            .then((data) => {
              if ((data.body && data.body.error) && data.body.status !== 200) throw new Error(`Error refreshing spotify, ${JSON.stringify(data.body)}`);

              if (i < refresherOpts.length - 1) {
                nextItem = refresherOpts[++i];

                if (i === 1) {
                  nextItem.headers.Authorization = `Bearer ${data.body.access_token}`
                  nextItem = refresherOpts[++i];
                  nextItem.body = {
                    accessToken: data.body.access_token,
                    refreshToken: data.body.refresh_token,
                    expiresIn: data.body.expires_in
                  }
                }
              }

              return data;
            });
        })
        .then((result) => {
          // only return item
          return result[1];
        });
      }
    });
};
