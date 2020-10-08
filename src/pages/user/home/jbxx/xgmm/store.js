import React, { Component } from 'react'
import apiPath from '../../../../../common/apiPath'
import { post } from '../../../../../util/request'
import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'

class Store {
    @observable success = false
    @observable ret = 0
    @observable msg = ''
    @action xgmm = async (params = {}) => {
      try {
        this.success = false
        let res = await post(apiPath.GET_USER_XGMM, params)
        if (res.success) {
          this.success = true
          message.destroy()
          message.success(res.msg, 1)
        } else {
          this.ret = res.ret
          this.success = false
          message.destroy()
          message.error(res.msg, 1)
        }
      } catch (error) {
        message.error('服务调用失败')
      }
    }
}
export default new Store()
