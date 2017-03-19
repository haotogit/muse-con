import React from 'react'
import { keyMaker } from '../helpers'

const EventBlock = (props) => {
  let { events } = props
  let labels = Object.keys(events)
  console.log('eventss', events)
  let imgStyle = {
    width: '18%'
  }
      
  return (
    <div className='col-sm-8 col-sm-offset-4'>
      {
        labels.map(key => 
          <section key={key} id={key} className='group'>
            <h3>{key}</h3>
            { 
              events[key].map((eachEv, i) => 
                <div key={`${key}${i}`} id={`${key}${i}`} className='subgroup'>
                  <h5>{eachEv.name}</h5>
                  <p>Date: {eachEv.dates.start.localDate}</p>
                  <p>Time: {eachEv.dates.start.localTime}</p>
                  <p>Where: {eachEv._embedded.venues && eachEv._embedded.venues.length > 0 ? `${eachEv._embedded.venues[0].name}` : ''}</p>
                  <img src={eachEv.images.find(ea => ea.ratio == '3_2' || ea.ratio == '4_3').url} style={imgStyle}/>
                  <a key={i} target="_blank" href={eachEv.url}>Buy Tickets</a>
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

