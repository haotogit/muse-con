import React from 'react'
import { keyMaker } from '../helpers'
import { IconButton } from '@material-ui/core';
import { LocationOnTwoTone, 
  AttachMoneyTwoTone, 
  LocalPlayTwoTone, 
  CollectionsBookmarkTwoTone,
  DeleteOutlineTwoTone } from '@material-ui/icons'

const EventBlock = (props) => {
  let { events, actions, userAuth, saveEvent } = props
  let labels = events && !Array.isArray(events) ? Object.keys(events) : null;
  let currFocus;
  // temp
  saveEvent = saveEvent ? saveEvent : actions.saveEvent;

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
    const currEl = /explore/.test(props.location.pathname) && labels ? document.getElementById(`iconTimesContainerOther${index}`) : document.getElementById(`iconTimesContainer${index}`);

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
                    <div key={`${key}${i}`} id={`${key}${i}`} className='subgroup' onMouseOver={() => changeFocus(i)} onMouseOut={() => changeFocus(i)}>
                      <div className='icon-times-container' id={`iconTimesContainerOther${i}`}>
                        <IconButton onClick={() => saveEvent(userAuth, eachEv, events, key, i)}><CollectionsBookmarkTwoTone color='secondary' /></IconButton>
                      </div>
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
                        <p><LocationOnTwoTone />{eachEv._embedded && eachEv._embedded.venues && eachEv._embedded.venues.length > 0 ? `${eachEv._embedded.venues[0].name}` : ''}</p>
                        {
                          eachEv.priceRanges && eachEv.priceRanges[0] ?
                            (
                              <div>
                                <p>{eachEv.priceRanges[0]['min'].toLocaleString(eachEv.priceRanges[0]['currency'], {style:'currency', currency:eachEv.priceRanges[0]['currency']})} - {eachEv.priceRanges[0]['max'].toLocaleString(eachEv.priceRanges[0]['currency'], {style:'currency', currency:eachEv.priceRanges[0]['currency']})}</p>
                              </div>
                            )
                            : ''
                        }

                        <LocalPlayTwoTone />
                        <a key={i} target='_blank' href={eachEv.url}>&nbsp;Buy Tickets</a>
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
                    <IconButton onClick={() => saveEvent(userAuth, eachEv, events, events)}><DeleteOutlineTwoTone color='secondary' /></IconButton>
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
                    
                    <p><LocationOnTwoTone />{eachEv._embedded && eachEv._embedded.venues && eachEv._embedded.venues.length > 0 ? `${eachEv._embedded.venues[0].name}` : ''}</p>
                    {
                      eachEv.priceRanges && eachEv.priceRanges[0] ?
                        (
                          <p>{eachEv.priceRanges[0]['min'].toLocaleString(eachEv.priceRanges[0]['currency'], {style:'currency', currency:eachEv.priceRanges[0]['currency']})} - {eachEv.priceRanges[0]['max'].toLocaleString(eachEv.priceRanges[0]['currency'], {style:'currency', currency:eachEv.priceRanges[0]['currency']})}</p>
                        )
                        : ''
                    }
                    <LocalPlayTwoTone />
                    <a key={i} target='_blank' href={eachEv.url}>&nbsp;Buy Tickets</a>
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
