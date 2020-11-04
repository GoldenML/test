import React, { Component } from 'react'
import apiPath from 'Common/apiPath'
import { post } from 'Util/request'
import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'

class Store {
    @observable success = false
    @action publish = async (params = {}) => {
      try {
        let res = await post(apiPath.POST_POST_PUBLISH, params)
        runInAction(() => {
          this.success = res.success
          message.destroy()
          if (res.success) {
            message.success(res.msg)
          } else {
            message.error(res.msg)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    @observable data = []
    @action postFind = async (params = {}) => {
      try {
        let res = await post(apiPath.POST_POST_FIND_KEYWORDS, params)
        runInAction(() => {
          this.success = res.success
          message.destroy()
          if (res.success) {
            this.data = res.resultList
          } else {
            message.error(res.msg)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
}
export default new Store()
