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
    let w = 800, h = 600, r = 200
    let colors = ['#ff2b71', '#ff5ed2', '#3aa198', '#42d4ff', '#19647E', '#8B1E3F'],
        totalCount = 0

    this.props.spotify.top10.forEach(each => totalCount += each.value)

    let svg = d3.select('body').select('svg')
                .data([this.props.spotify.top10])
                .attr('width', w)
                .attr('height', h)
                .append('svg:g')
                .attr('transform', `translate(250, 250)`)

    let pie = d3.layout.pie()
                .sort(null)
                .value((d) => d.value)
                .padAngle(.04)

    let arc = d3.svg.arc()
                    .outerRadius(r)
                    .innerRadius(125)

    let arcs = svg.selectAll('g.slice')
                  .data(pie)
                  .enter()
                  .append('svg:g')
                  .attr('class', 'slice')

    arcs.append('svg:path')
        .attr('stroke-width', 2)
        .attr('stroke', (d, i) =>  colors[i % (colors.length - 1)])
        .attr('fill', '#363e42')
        .attr('d', (d) => arc(d))

    arcs.append('svg:text')
        .attr('transform', (d) => {
          d.innerRadius = 0;
          d.outerRadius = r;
          return `translate(${arc.centroid(d)})`
        })
        .attr('text-anchor', 'middle')
        .text((d, i) => {
          return `${d.data.label}: ${((d.data.value / totalCount) * 100).toFixed(0)}%`
        })
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
