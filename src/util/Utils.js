import apiPath from '../common/apiPath'
import { post } from '../util/request'
const Utils = {
  exit: async () => {
    await post(apiPath.GET_USER_EXIT, {})
    sessionStorage.setItem('token', '')
  }
}

export default Utils
