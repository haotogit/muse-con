import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { 
  LinearProgress,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
	Grid,
	Menu,
	MenuItem,
} from '@material-ui/core';
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
		width: '100%',
  },
	hideLinear: {
		backgroundColor: '#5899e2'
	},
}));

const Navigation = ({userAuth, logout, loading}) => {
  const classes = useStyles();
  const routes = ['/', 'explore']
	const [anchorEl, setAnchorEl] = React.useState(null);
	let history = useHistory();

  const progress = () => {
      return (
				<LinearProgress color="primary" 
					classes={{ root: classes.linearRoot }}
					classes={loading ? null : { root: classes.hideLinear }}/>
      )
  }

	const openMenu = (ev) => {
		setAnchorEl(ev.currentTarget);
	};

	const closeMenu = (ev, action) => {
		if (action === 'logout') {
			logout();
		} else if (action === 'user') {
			history.push(`/user`);
		}
		setAnchorEl(null);
	};

  return (
    <React.Fragment>
      <AppBar fixed='true'>
				{ progress() }
        <Toolbar variant='dense'>
					<Grid
						container
						direction='row'
						alignItems='center'
						justify='space-between'>
						<Grid item xs={3}>
							<ul style={{display:'flex',alignItems:'baseline', margin:0}}>
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

						{
							userAuth ?
								<Grid item xs={3} style={{textAlign: 'right', flexBasis: '8%'}}>
									<Button 
										aria-controls="simple-menu"
										aria-haspopup="true"
										color="inherit"
										onClose={closeMenu}
										onClick={openMenu}>
										<AccountCircleTwoTone style={{marginRight: '0.1em'}}/>
										{userAuth ? userAuth.username : 'User'}
									</Button>
									<Menu 
										id='user-menu'
										anchorEl={anchorEl}
										keepMounted
										open={Boolean(anchorEl)}>
										<MenuItem onClick={(ev) => closeMenu(ev, 'user')}>Profile</MenuItem>
										<MenuItem onClick={(ev) => closeMenu(ev, 'logout')}>Logout</MenuItem>
									</Menu>
								</Grid>
							: null
						}
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
