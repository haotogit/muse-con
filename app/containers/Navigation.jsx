import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { 
  LinearProgress,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button
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
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            MuseCon
          </Typography>
          <Button color="inherit">
            <Link to='/user' href='#'><AccountCircleTwoTone /> {userAuth && userAuth.username ? userAuth.username : 'User'}</Link>
          </Button>
        </Toolbar>
      </AppBar>
      { progress() }
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  loading: state.main.loading,
})

export default connect(mapStateToProps, { logout })(Navigation)
  
