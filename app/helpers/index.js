import popsicle from 'popsicle'

export function popWrap (...args) {
  console.log('args::', args)
  let optsArr = ['method', 'url', 'body'],
      opts = {}

  optsArr.forEach((each, i) => {
    opts[each] = args[i]
  })

  popsicle(opts)
}
