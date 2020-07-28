import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import { Header } from 'components'

import { Home } from 'pages'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.scss'

const App = () => {
  useEffect(() => {
    toggleTheme()
    // eslint-disable-next-line
  }, [])

  const toggleTheme = () => {
    const htmlTag = document.getElementsByTagName('html')[0]
    const htmlClasses = htmlTag.className.split(' ')
    let newClasses
    if (htmlClasses.indexOf('dark') > -1) {
      newClasses = [...htmlClasses.filter((c) => c !== 'dark'), 'light']
    } else {
      newClasses = [...htmlClasses.filter((c) => c !== 'light'), 'dark']
    }
    htmlTag.className = newClasses.join(' ')
  }

  return (
    <>
      <Header toggleTheme={toggleTheme} />
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route exact path={['/names/:isMale', '/names/:isMale/:code']} component={Names} /> */}
          <Redirect to='/' />
        </Switch>
      </Router>
    </>
  )
}

export default App
