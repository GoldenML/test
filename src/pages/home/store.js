import React, { Component } from 'react'
import apiPath from '../../common/apiPath'
import { post } from '../../util/request'
import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'

class Store {
    @observable success = false
    @observable msg = true
    @action login = async (params = {}) => {
      try {
        this.success = false
        let res = await post(apiPath.GET_USER_LOGIN, params)
        runInAction(() => {
          console.log('res', res)
          if (res.success) {
            this.success = true
            message.destroy()
            message.success(res.msg, 1)
          } else {
            this.success = false
            message.destroy()
            message.error(res.msg)
          }
        })
      } catch (error) {
        message.error('服务调用失败')
      }
    }
}
export default new Store()
