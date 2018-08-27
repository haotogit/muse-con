import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const CircleProgress = (props) => {
  let { count } = props;
  console.log('wassap', props)

  return (
      <div>
      <CircularProgress
        mode='determinate'
        value={count}/>
      </div>
  )
};

export default CircleProgress
