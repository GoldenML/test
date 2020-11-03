import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'antd/dist/antd.css'
import { history, RootStore } from './Store'
let getGlobalParamsAndPages = async () => {
  ReactDOM.render(
    <React.Fragment>
      <App history={history} store={RootStore} />
    </React.Fragment>,
    document.getElementById('root')
  )
}

getGlobalParamsAndPages()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
