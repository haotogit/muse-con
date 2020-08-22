import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import ImgList from '../components/ImgList'
import img from '../assets/4ea5d964626877.5ad85d1096b3b.png'
import img1 from '../assets/fay.png'
import img2 from '../assets/faye2.gif'
import img3 from '../assets/fay.gif'
export default function Display(props) {
	const { currView, data } = props
	const tileData = [
		{
			img,
			title: 'Image',
			author: 'author',
			featured: true
		},
		{
			img: img1,
			title: 'Image',
			author: 'author',
		},
		{
			img: img2,
			title: 'Image',
			author: 'author',
		},
		{
			img: img3,
			title: 'Image',
			author: 'author',
		}
	]

  return (
		<React.Fragment>
			{((currView) => {
				switch(currView) {
					default:
						<ImgList data={data} currView={currView}/>
				}
			})}
		</React.Fragment>
  )
}
