import popsicle from 'popsicle'

export function popWrap (...args) {
  console.log('args::', args)
  popsicle({method: args[0], url: args[1], body:args[2]})
}