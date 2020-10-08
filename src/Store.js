
import { createBrowserHistory } from 'history'
import RootStore from './globalStore/index'
const history = createBrowserHistory()

history.replace = ({ path, state = {}}) => {
  history.replace(path, state)
}
history.jump = ({ path, state = {}}) => {
  history.push(path, state)
}

export { history, RootStore }
