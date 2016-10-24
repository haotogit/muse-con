import React, { Component } from 'react'
import { PieChart, Pie, Cell } from 'recharts'

class UserTaste extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {


  }
  
  render () {
    let { genres } = this.props.spotify
    let top10 = this.props.spotify.genres.splice(0, 10)
    let currColor
    console.log('10', top10)

    return (
      <div id='genresGraph'>
        <div className='header'><h3>Top Genres</h3></div>
        <PieChart width={600} height={600}>
          <Pie data={top10} cx='50%' cy='35%' outerRadius={190} innerRadius={150} labelLine={false} label={this.label} paddingAngle={3}>
          {
            top10.map((entry, index) => {
              currColor = this.whichColor()
              return <Cell stroke={`${currColor}`} strokeWidth='1' key={`cell-${index}`} fill='#363e42' onMouseOver={this.showLabel.bind(this)} />
            })
          }
          </Pie>
        </PieChart>
      </div>
    )
  }

  label (obj) {
    let { cx, cy, midAngle, innerRadius, outerRadius, percent, index, label } = obj
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
    return (
      <text className='top-spotify-label' key='index' x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${label}: ${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  showLabel (event) {
    console.log('event::', event)
    console.log('this::', this)
    
  }

  whichColor () {
    let colors = ['#ff2b71', '#ff5ed2', '#3aa198', '#42d4ff']

    return colors[Math.round(Math.random() * ((colors.length - 1) - 0))]

  }

  
}

export default UserTaste
