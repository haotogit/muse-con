import React, { Component } from 'react'
import { PieChart, Pie, Cell } from 'recharts'

class UserTaste extends Component {
  constructor (props) {
    super(props)
    
  }

  componentWillMount () {
  }

  componentDidMount () {

  }
  
  render () {
    let currColor,
        top10 = this.props.spotify.top10

    return (
      <div id='genresGraph'>
        <div className='header'><h3>Top Overall</h3></div>
        <PieChart width={800} height={600}>
          <Pie data={top10} cx='35%' cy='30%' outerRadius={100} innerRadius={80} labelLine={false} label={this.whichLabel} paddingAngle={6}>
          {
            top10.map((entry, index) => {
              currColor = this.whichColor()
              return <Cell key={`${entry.label}`} stroke={`${currColor}`} strokeWidth='1' fill='#363e42' onMouseEnter={this.showLabel} onMouseLeave={this.showLabel} />
            })
          }
          </Pie>
        </PieChart>
      </div>
    )
  }

  showLabel (event) {
    let currColor = event.type === 'mouseenter' ? event.target.getAttribute('stroke') : '#363e42'
    event.target.setAttribute('fill', currColor)
  }

  whichLabel (obj) {
    let { cx, cy, midAngle, innerRadius, outerRadius, percent, index, label } = obj
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text fill='#fff' x={x} y={y} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${label}: ${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  whichColor () {
    let colors = ['#ff2b71', '#ff5ed2', '#3aa198', '#42d4ff', '#19647E', '#8B1E3F']

    return colors[Math.round(Math.random() * ((colors.length - 1) - 0))]

  }

  
}

export default UserTaste
