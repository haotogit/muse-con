import React, { Component } from 'react'
//import { PieChart, Pie, Cell } from 'recharts'
import * as d3 from 'd3'

class UserTaste extends Component {
  constructor (props) {
    super(props)
    
  }

  componentWillMount () {
  }

  componentDidMount () {

    //<PieChart width={800} height={600}>
    //      <Pie data={top10} cx='35%' cy='30%' outerRadius={100} innerRadius={80} labelLine={false} label={this.whichLabel} paddingAngle={6}>
    //      {
    //        top10.map((entry, index) => {
    //          currColor = this.whichColor()
    //          return <Cell key={`${entry.label}`} stroke={`${currColor}`} strokeWidth='1' fill='#363e42' onMouseEnter={this.showLabel} onMouseLeave={this.showLabel} />
    //        })
    //      }
    //      </Pie>
    //    </PieChart>
  
    let w = 800, h = 600, r = h / 2
    let colors = ['#ff2b71', '#ff5ed2', '#3aa198', '#42d4ff', '#19647E', '#8B1E3F']

    let svg = d3.select('body').select('svg')
                .data([this.props.spotify.top10])
                .attr('width', w)
                .attr('height', h)
                .append('svg:g')
                .attr('transform', `translate(${r}, ${r})`)

    let pie = d3.layout.pie().value((d) => d.value)
    let arc = d3.svg.arc().outerRadius(r)

    let arcs = svg.selectAll('g.slice')
                  .data(pie)
                  .enter()
                  .append('svg:g')
                  .attr('class', 'slice')

    arcs.append('svg:path')
        .attr('fill', (d, i) =>  colors[i % (colors.length - 1)])
        .attr('d', (d) => arc(d))
  }
  
  render () {
    let currColor,
        top10 = this.props.spotify.top10

    return (
      <div id='genresGraph'>
        <div className='header'><h3>Top Overall</h3></div>
        <svg></svg>
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
