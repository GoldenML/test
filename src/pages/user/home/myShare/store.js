import React, { Component } from 'react'
import apiPath from '../../../../common/apiPath'
import { post } from '../../../../util/request'
import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'

class Store {
    @observable success = false
    @observable msg = ''
    @observable ret = 0
    @action filedel = async (params = {}) => {
      try {
        this.success = false
        let res = await post(apiPath.GET_FILE_DEL, params)
        runInAction(() => {
          if (res.success) {
            this.success = true
            message.destroy()
            message.success(res.msg)
          } else {
            this.ret = res.ret
            message.destroy()
            message.error(res.msg)
          }
        })
      } catch (error) {
        message.error('服务调用失败')
      }
    }
    @action upload = async (params = {}) => {
      try {
        this.success = false
        let res = await post(apiPath.GET_FILE_UPLOAD, params)
        runInAction(() => {
          if (res.success) {
            this.success = true
            message.destroy()
            message.success(res.msg)
          } else {
            this.ret = res.ret
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
