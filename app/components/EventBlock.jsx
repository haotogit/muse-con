import React from 'react'

const EventBlock = (props) => {
  let { events } = props
  let labels = Object.keys(events)
      

  return (
    <div>
      {
        labels.map(key => 
          events[key].map((eachEv, i) =>
            <div>
              {i == 0 ? <h3>{key}</h3> : ''}
              <a href={eachEv.url}>{eachEv.name}</a>
            </div>
          )
        )
      }
    </div>
  )
}

export default EventBlock
