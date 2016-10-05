import popsicle from 'popsicle'

export function popWrap (...args) {
  let optsArr = ['method', 'url', 'body'],
      opts = {}

  optsArr.forEach((each, i) => {
    opts[each] = args[i]
  })

  return popsicle(opts)
}
