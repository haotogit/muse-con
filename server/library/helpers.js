const popsicle = require('popsicle');
const promise = require('bluebird');

module.exports.spotifyRequestResolver = (spotifyObj, spotifyOpts) => {
  let refresherOpts, nextItem, authParam;
  return popsicle.request(spotifyOpts)
    .then((data) => {
      if (data.body.items) return data;
      else if (data.body.error && data.body.error.message === 'The access token expired') {
        console.log('runningrefresher===')
        authParam = new Buffer(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

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
            url: `http://localhost:8087/api/v1/users/${spotifyObj.userId}/thirdparty/${spotifyObj._id}`
          }
        ];

        return promise.mapSeries(refresherOpts, (value, i) => {
          //console.log('requesting', value);
          return popsicle.request(value)
            .then((data) => {
              //console.log('responding', data)
              if ((data.body && data.body.error) && data.body.status !== 200) throw new Error(`Error refreshing spotify, ${JSON.stringify(data.body)}`);

              if (i < refresherOpts.length - 1) {
                nextItem = refresherOpts[++i];
              }

              if (i === 1) {
                nextItem.headers.Authorization = `Bearer ${refresherOpts[1].body.accessToken}`
                
              } else if (i === 2) {
                nextItem.body = {
                  accessToken: data.body.access_token,
                  refreshToken: data.body.refresh_token,
                  expiresIn: data.body.expires_in
                }
                //next.item.headers.Authorization = `Bearer ${user.token}`
              }

              return data;
            });
        })
        .then((result) => {
          // only return item
          return result[2].body;
        });
      }
    });
};
