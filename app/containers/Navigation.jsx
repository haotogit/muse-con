import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { 
  LinearProgress,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
	Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { 
  AccountCircleTwoTone,
  } from '@material-ui/icons'
import { logout } from '../actions'

const sections = ['events']

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  linearRoot: {
    width: '100%'
  }
}));

const Navigation = ({userAuth, logout, loading}) => {
  const classes = useStyles();
  const routes = ['/', 'explore']

  const progress = () => {
    if (!loading) return null;
    else {
      return (
        <LinearProgress color="secondary" classes={{ root: classes.linearRoot }}/>
      )
    }
  }

  return (
    <React.Fragment>
      <AppBar fixed='true'>
				{ progress() }
        <Toolbar>
					<Grid
						container
						direction='row'
						alignItems='center'
						justify='space-between'>
						<Grid item xs={3}>
							<ul style={{display:'flex',alignItems:'baseline'}}>
								<li>
									<Typography variant="h6" className={classes.title}>
										MuseCon
									</Typography>
								</li>
								{
									userAuth ?
										routes.map(route => 
											<li key={route} style={{width:'8em',padding:'1em'}}>
												<Link to={route}>
													{route === '/' ? 'dashboard' : route}
												</Link>
											</li>
										)
									: null
								}
							</ul>
						</Grid>

						<Grid item xs={3} style={{textAlign: 'right', flexBasis: '8%'}}>
							<Button color="inherit">
								<AccountCircleTwoTone style={{marginRight: '0.1em'}}/>
								<Link to='/user' href='#'>{userAuth ? userAuth.username : 'User'}</Link>
							</Button>
						</Grid>
					</Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  userAuth: state.user.auth,
  loading: state.main.loading,
})

export default connect(mapStateToProps, { logout })(Navigation)
