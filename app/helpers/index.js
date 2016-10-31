import popsicle from 'popsicle'
import qString from 'query-string'

function popWrap (...args) {
  let optsArr = ['method', 'url', 'body'],
      opts = {}

  optsArr.forEach((each, i) => {
    opts[each] = args[i]
  })

  return popsicle(opts)
}

function getEvents (user) {
  let latLong = `${user.lat},${user.long}`,
      radius = 50
  let qStr = {
    apikey: `${process.env.TICKETMASTER_KEY}`,
    latlong: latLong,
    radius: radius
  }
  let query = qString.stringify(qStr)

  let url = `/v2/events.json&${query}`

  let opts = {
    method: 'GET'
  }

  fetch(url, opts)
    .then(resp => console.log('resp', resp))

  //popsicle(opts).then((resp) => console.log('hello there::', resp))
}

export { popWrap, getEvents }
