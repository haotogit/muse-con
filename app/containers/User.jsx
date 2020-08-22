import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spotify from '../components/Spotify'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import List from '../components/List'

class User extends Component {
	static getContainerStateScope() {
		return {
			props: (state) => {
				return {
					searchList: state.event.searchList
				}
			},
			actions: (dispatch) => {
				return {
					actions: bindActionCreators(actions, dispatch)
				}
			}
		}
	}

  componentDidMount() {
    if (this.props.userAuth.genres && this.props.userAuth.genres.length !== 0) {
      //this.renderGraph(this.props.userAuth.genres)
    }
  }
  
  render() {
    return (
      <div className='wrapper' style={{marginTop:'10%'}}>
        <Spotify {...this.props}/>
        <div className='row' style={{marginTop:'3%'}}>
          <div className='col-xs-4'>
            <h3>top artists</h3>
            <div className='scroll-contain'>
              <List items={this.props.userAuth.artists} name='top artists'></List>
            </div>
          </div>
          <div className='col-xs-4'>
            <h3>top tracks</h3>
            <div className='scroll-contain'>
              <List items={this.props.userAuth.tracks} name='top tracks'></List>
            </div>
          </div>
          <div className='col-xs-4'>
            {/* this.props.userAuth.genres && this.props.userAuth.genres.length !== 0 ? <svg></svg> : null */}
            <h3>top genres</h3>
            <div className='scroll-contain'>
              <List items={this.props.userAuth.genres} name='top genres'></List>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderGraph (data) {
    let w = 300, h = 300, r = Math.min(w, h) / 2;
    let colors = ['#ff2b71', '#3aa198', '#42d4ff', '#ff5ed2', '#19647E', '#8B1E3F'],
      totalCount = 0;
    d3.select('body').select('svg').selectAll('*').remove();
    let svg = d3.select('body').select('svg')
                .data([data])
                .attr('width', w)
                .attr('height', h)
                .append('svg:g')
                .attr('transform', `translate(${w/2}, ${h/2})`);
    let pie = d3.layout.pie()
                .sort(null)
                .value((d) => d.factor);
    let arc = d3.svg.arc()
                .outerRadius(r)
                .innerRadius(100)
    let arcs = svg.selectAll('g.slice')
                  .data(pie)
                  .enter()
                  .append('svg:g')
                  .attr('class', 'slice')
                  .on('mouseover', focusArc)
                  .on('mouseout', focusArc)

    function focusArc (d, i) {
      let color = this.getAttribute('fill') === this.getAttribute('stroke') ? '#363e42' : this.getAttribute('stroke')

      //this.setAttribute('fill', color)
      let fixLabel = (str) => /&/.test(str) ? str.replace(/&/, '') : str

      let text = d3.select(`#${fixLabel(d.data.name)}`)
      text.classed({ 'label-text' : text.classed('label-text') ? false : true })
    }

    arcs.append('svg:path')
        .attr('stroke-width', 2)
        .attr('stroke', (d, i) =>  colors[i % (colors.length - 1)])
        .attr('fill', (d, i) =>  colors[i % (colors.length - 1)])
        .attr('d', (d) => arc(d))
        
    arcs.append('svg:text')
        .attr('transform', (d) => {
          d.innerRadius = 0;
          d.outerRadius = r;
          return `translate(${arc.centroid(d)})`
        })
        .attr('id', (d) => /&/.test(d.data.name) ? d.data.name.replace(/&/, '') : d.data.name)
        .attr('class', 'label-text')
        .attr('text-anchor', 'middle')
        .text((d, i) => {
          return `${d.data.name}: ${d.data.factor}`
        })
        .attr('fill', '#fff')
  }
}

export default User
