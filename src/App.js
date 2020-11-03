import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import CacheRoute from 'react-router-cache-route'
import { Provider } from 'mobx-react'
import { AppRouter } from './router'
import Home from './pages/home'
import User from './pages/user'
import { connect } from 'react-redux'
import NotFound from './pages/error'
import { lcStorage } from './util/storage'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <Provider {...this.props.store} >
        <Router>
          <Switch>
            {
              AppRouter.map((item, index) => {
                return <Route key={index} path={item.path} exact render={props => (!item.auth ? <item.component {...props} /> : (lcStorage.getItem('token') ? <item.component {...props} /> : <Redirect to='/home' />))} />
              })
            }
            <Redirect to='/404' />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
