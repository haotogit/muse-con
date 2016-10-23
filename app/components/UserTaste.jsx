import React, { Component } from 'react'
import { PieChart, Pie, Cell } from 'recharts'

class UserTaste extends Component {
  constructor (props) {
    super(props)
    console.log('props', this.props)
  }

  componentDidMount () {


  }
  
  render () {
    let { genres } = this.props.spotify
    let top10 = this.props.spotify.genres.splice(0, 10)
    console.log('10', top10)

    return (
      <div id='genresGraph'>
        <div className='header'>Top Genres</div>
        <PieChart width={600} height={600}>
          <Pie data={top10} cx='200' cy='200' outerRadius={60} labelLine={false} label={this.label}>
          {
            top10.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={this.whichColor()} />
            ))
          }
          </Pie>
        </PieChart>
      </div>
    )
  }

  label ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, label }) {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${label}: ${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  whichColor () {
    let colors = ['#ff2b71', '#ff5ed2', '#3aa198', '#42d4ff']

    return colors[Math.round(Math.random() * ((colors.length - 1) - 0))]

  }

  
}

export default UserTaste
