import React, { Component } from 'react'
import { StylesProvider } from '@material-ui/core/styles'
import { hot } from 'react-hot-loader'
import Routes from '../routes'

const App = () => {
  return(
		<StylesProvider injectFirst>
			<Routes />
		</StylesProvider>
  )
}

export default hot(module)(App)
