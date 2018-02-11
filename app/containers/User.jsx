import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spotify from '../components/Spotify'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import Lists from '../components/Lists'

class User extends Component {
  componentWillReceiveProps () {
    
  }

  componentWillMount() {
    //let currList = this.props.userAuth[this.props.userAuth.searchOpts.currSrc][this.props.userAuth.searchOpts.by]
    //this.props.dispatch(actions.setSearchList(currList))

    if (this.props.userAuth.thirdParties.length !== 0 && this.props.userAuth.thirdParties[0].top10) {
      this.renderGraph()
    }
  }

  componentDidMount () {
    if (this.props.userAuth.thirdParties.length !== 0 && this.props.userAuth.thirdParties[0].top10) {
      this.renderGraph()
    }
  }
  
  render () {
    return (
      <div className='wrapper' style={{marginTop:'5%'}}>
        <div className='row'>
          <Lists {...this.props} />
          <Spotify {...this.props} />
        </div>
      </div>
    )
  }

  renderGraph () {
    let w = 400, h = 400, r = 150
    let colors = ['#ff2b71', '#3aa198', '#42d4ff', '#ff5ed2', '#19647E', '#8B1E3F'],
      totalCount = 0,
      spotify = this.props.userAuth.thirdParties.length !== 0 ? this.props.userAuth.thirdParties[0] : null;

    if (spotify) {
      spotify.top10.forEach(each => totalCount += each.value)

      let svg = d3.select('body').select('svg')
                  .data([spotify.top10])
                  .attr('width', w)
                  .attr('height', h)
                  .append('svg:g')
                  .attr('transform', `translate(200, 200)`)

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
                    .on('mouseover', focusArc)
                    .on('mouseout', focusArc)
                    

      function focusArc (d, i) {
        let color = this.getAttribute('fill') === this.getAttribute('stroke') ? '#363e42' : this.getAttribute('stroke')

        //this.setAttribute('fill', color)
        let fixLabel = (str) => /&/.test(str) ? str.replace(/&/, '') : str

        let text = d3.select(`#${fixLabel(d.data.label)}`)
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
          .attr('id', (d) => /&/.test(d.data.label) ? d.data.label.replace(/&/, '') : d.data.label)
          .attr('class', 'label-text')
          .attr('text-anchor', 'middle')
          .text((d, i) => {
            return `${d.data.label}: ${((d.data.value / totalCount) * 100).toFixed(0)}%`
          })
          .attr('fill', '#fff')
    }
  }

}

function mapStateToProps(state) {
  return {
    userAuth: state.user.userAuth,
    searchList: state.event.searchList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
