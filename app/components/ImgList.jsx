import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
	Grid,
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton,
} from '@material-ui/core'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import img from '../assets/4ea5d964626877.5ad85d1096b3b.png'
import img1 from '../assets/fay.png'
import img2 from '../assets/faye2.gif'
import img3 from '../assets/fay.gif'

const useStyles = makeStyles((theme) => ({
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
	gridListTile: {
		padding: '0.1em',
  },
	gridListTileImgWidth: {
		webkitBoxShadow: '-1px 0px 6px 2px rgba(0,0,0,0.75)',
    mozBoxShadow: '-1px 0px 6px 2px rgba(0,0,0,0.75)',
		boxShadow: '-1px 0px 6px 2px rgba(0,0,0,0.75)',
		transform: 'translateY(-40%)',
	},
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}))

export default function ImgList() {
  const classes = useStyles()
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
    <Grid container classes={{ root: classes.root }} className='display-contain'>
      <GridList cellHeight={200} className={classes.gridList}>
        {tileData.map((tile, k) => (
					<GridListTile
						key={tile.img}
						cols={tile.featured ? 2 : 1}
						rows={tile.featured ? 2 : 1}
						classes={{
							root: classes.gridListTile,
							imgFullWidth: classes.gridListTileImgWidth
					}}>
					<img src={tile.img} alt={tile.title} />
					<GridListTileBar
						title={tile.title}
						titlePosition="top"
						actionIcon={
							<IconButton aria-label={`star ${tile.title}`} className={classes.icon}>
								<StarBorderIcon />
							</IconButton>
						}
						actionPosition="left"
						className={classes.titleBar}
					/>
				</GridListTile>
        ))}
      </GridList>
    </Grid>
  )
}
