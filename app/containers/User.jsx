import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spotify from '../components/Spotify'
import { bindActionCreators } from 'redux'
import { analyzeSpotify } from '../actions'

class User extends Component {
  constructor (props) {
    super()

  }

  componentDidMount () {
    this.renderGraph()
  }
  
  render () {
    return (
      <div>
        <Spotify spotify={this.props.userAuth.spotify} 
                 analyzeSpotify={this.props.analyzeSpotify} />
      </div>
    )
  }

  renderGraph () {
    let w = 800, h = 600, r = 200
    let colors = ['#ff2b71', '#3aa198', '#42d4ff', '#ff5ed2', '#19647E', '#8B1E3F'],
        totalCount = 0

    this.props.userAuth.spotify.top10.forEach(each => totalCount += each.value)

    let svg = d3.select('body').select('svg')
                .data([this.props.userAuth.spotify.top10])
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
                    .innerRadius(r - 50)

    let arcs = svg.selectAll('g.slice')
                  .data(pie)
                  .enter()
                  .append('svg:g')
                  .attr('class', 'slice')
                  

    function focusArc (d, i) {
      let color = this.getAttribute('fill') === this.getAttribute('stroke') ? '#363e42' : this.getAttribute('stroke')
      this.setAttribute('fill', color)
      let text = d3.select(`#${d.data.label}`)
      text.classed({ 'label-text' : text.classed('label-text') ? false : true })
    }

    arcs.append('svg:path')
        .attr('stroke-width', 2)
        .attr('stroke', (d, i) =>  colors[i % (colors.length - 1)])
        .attr('fill', '#363e42')
        .attr('d', (d) => arc(d))
        .on('mouseover', focusArc)
        .on('mouseout', focusArc)

    arcs.append('svg:text')
        .attr('transform', (d) => {
          d.innerRadius = 0;
          d.outerRadius = r;
          return `translate(${arc.centroid(d)})`
        })
        .attr('id', (d) => d.data.label)
        .attr('class', 'label-text')
        .attr('text-anchor', 'middle')
        .text((d, i) => {
          return `${d.data.label}: ${((d.data.value / totalCount) * 100).toFixed(0)}%`
        })
        .attr('fill', '#fff')
  }

}

function mapStateToProps(state) {
  return {
    userAuth: state.reducer.userAuth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    analyzeSpotify: bindActionCreators(analyzeSpotify, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
