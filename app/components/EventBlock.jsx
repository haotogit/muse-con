import React from 'react'
import { keyMaker } from '../helpers'
import IconButton from 'material-ui/IconButton'

const EventBlock = (props) => {
  let { events, actions, userAuth } = props
  let labels = events && !Array.isArray(events) ? Object.keys(events) : null;
  let currFocus;

  let prettyDate = (date, ref) => {
    let currDate = moment()

    if (date) {
      if (date.search(/:/) == -1) {
        if (ref == 'date') return moment(date).format('Do')
        else if (ref == 'month') return moment(date).format('MMM')
      } else return moment().hour(date).format('hA')
    }
  }

  let changeFocus = (index) => {
    const currEl = document.getElementById(`iconTimesContainer${index}`);

    currEl.style.display = currEl.style.display === 'block' ? 'none' : 'block';
  };

  return (
    <div className={/explore/.test(props.location.pathname) ? 'col-sm-9 col-sm-offset-3' : ''}>
      {
        /explore/.test(props.location.pathname) && labels ?
          labels.map(key => 
            <div key={key}>
              <h3>{key}</h3>
              <section key={key} id={key} className='container-fluid group'>
                { 
                  events[key].map((eachEv, i) => 
                    <div key={`${key}${i}`} id={`${key}${i}`} className='subgroup'>
                      <div className='ev-img-contain' 
                           style={{backgroundImage:`url(${eachEv.images.find(ea => ea.ratio == '3_2' || ea.ratio == '4_3').url})`,}}>
                      </div>
                      <div className='ev-info'>
                        <h5>{eachEv.name}</h5>
                        <div className='ev-date'>
                          { eachEv.dates ? 
                            <h3>{prettyDate(eachEv.dates.start.localDate, 'month')} {prettyDate(eachEv.dates.start.localDate, 'date')} @ {prettyDate(eachEv.dates.start.localTime)}</h3>
                            : null
                          }
                        </div>
                        <i className="fa fa-location-arrow" aria-hidden="true"></i> 
                        <p>&nbsp;{eachEv._embedded && eachEv._embedded.venues && eachEv._embedded.venues.length > 0 ? `${eachEv._embedded.venues[0].name}` : ''}</p>
                        {
                          eachEv.priceRanges && eachEv.priceRanges[0] ?
                            (
                              <div>
                                <i className="fa fa-money" aria-hidden="true"></i>
                                <p>&nbsp;{eachEv.priceRanges[0]['min'].toLocaleString(eachEv.priceRanges[0]['currency'], {style:'currency', currency:eachEv.priceRanges[0]['currency']})} - {eachEv.priceRanges[0]['max'].toLocaleString(eachEv.priceRanges[0]['currency'], {style:'currency', currency:eachEv.priceRanges[0]['currency']})}</p>
                              </div>
                            )
                            : ''
                        }

                        <a key={i} target='_blank' href={eachEv.url}><i className="fa fa-shopping-cart"></i> Buy Tickets</a>
                        <IconButton iconClassName='fa fa-bookmark-o' onClick={() => actions.saveEvent(userAuth, eachEv, events, key, i)} style={{position:'absolute',top:'-6%',right:'0'}}></IconButton>
                      </div>
                    </div>
                  ) 
                } 
              </section>
            </div>
          ) : <section className='container-fluid group'>
            {/* user saved events @ dashboard */}
            {
              events ?
              events.map((eachEv, i) => 
                <div key={i} className='subgroup' onMouseOver={() => changeFocus(i)} onMouseOut={() => changeFocus(i)}>
                  <div className='icon-times-container' id={`iconTimesContainer${i}`}>
                    <IconButton iconClassName='fa fa-times' onClick={() => actions.saveEvent(userAuth, eachEv, events)} style={{position:'absolute',top:'-9%',right:'6%',fontSize:'2.5em',cursor:'pointer',zIndex:'50'}}></IconButton>
                  </div>
                  {
                    eachEv.images ? 
                      <div className='ev-img-contain' 
                        style={{backgroundImage:`url(${eachEv.images.find(ea => ea.ratio == '3_2' || ea.ratio == '4_3').url})`,}}>
                      </div> : null
                  }
                  <div className='ev-info'>
                    <h5>{eachEv.name}</h5>
                    <div className='ev-date'>
                      { eachEv.dates ?
                        <h3>{prettyDate(eachEv.dates.start.localDate, 'month')} {prettyDate(eachEv.dates.start.localDate, 'date')} @ {prettyDate(eachEv.dates.start.localTime)}</h3>
                        : null
                      }
                    </div>
                    <i className="fa fa-location-arrow" aria-hidden="true"></i> 
                    <p>&nbsp;{eachEv._embedded && eachEv._embedded.venues && eachEv._embedded.venues.length > 0 ? `${eachEv._embedded.venues[0].name}` : ''}</p>
                    {
                      eachEv.priceRanges && eachEv.priceRanges[0] ?
                        (
                          <div>
                            <i className="fa fa-money" aria-hidden="true"></i>
                            <p>&nbsp;{eachEv.priceRanges[0]['min'].toLocaleString(eachEv.priceRanges[0]['currency'], {style:'currency', currency:eachEv.priceRanges[0]['currency']})} - {eachEv.priceRanges[0]['max'].toLocaleString(eachEv.priceRanges[0]['currency'], {style:'currency', currency:eachEv.priceRanges[0]['currency']})}</p>
                          </div>
                        )
                        : ''
                    }
                    <a key={i} target='_blank' href={eachEv.url}>Buy Tickets</a>
                  </div>
                </div>
              ) : ''
            }
          </section>
      }
    </div>
  )
}

export default EventBlock
