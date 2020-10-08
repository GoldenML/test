import React, { Component } from 'react'
import apiPath from '../../../../../common/apiPath'
import { post } from '../../../../../util/request'
import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'

class Store {
    @observable grxx = {}
    @observable success = false
    @action getJbxx = async (params = {}) => {
      try {
        this.success = false
        let res = await post(apiPath.GET_USER_JBXX, params)
        runInAction(() => {
          if (res.success) {
            this.success = true
            this.grxx = res.data
          } else {
            this.success = false
            message.destroy()
            message.error(res.msg)
          }
        })
      } catch (error) {
        console.log('服务调用失败')
      }
    }
}
export default new Store()
