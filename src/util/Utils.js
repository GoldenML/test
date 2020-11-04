import apiPath from '../common/apiPath'
import { post } from '../util/request'
import { lcStorage } from './storage'
const Utils = {
  exit: async () => {
    await post(apiPath.GET_USER_EXIT, {})
    lcStorage.removeItem('token')
    // lcStorage.removeItem('username')
  }
}

export default Utils
