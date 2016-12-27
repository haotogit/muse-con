import React from 'react'
import { keyMaker } from '../helpers'

const EventBlock = (props) => {
  let { events } = props
  let labels = Object.keys(events)
      
  return (
    <div className='col-md-8'>
      {
        labels.map(key => 
          <section key={key} id={key} className='group'>
            <h3>{key}</h3>
            { 
              events[key].map((eachEv, i) => 
                <div key={`${key}${i}`} id={`${key}${i}`} className='subgroup'>
                  <a key={i} href={eachEv.name}>{eachEv.name}</a>
                </div>
              ) 
            } 
          </section>
        )
      }
    </div>
  )
}

export default EventBlock

