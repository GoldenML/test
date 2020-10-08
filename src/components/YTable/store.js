import React, { Component } from 'react'
import { observable, runInAction, action, extendObservable } from 'mobx'
import { post } from '../../util/request'
import { message } from 'antd'

class Store {
    @action setStore = (params = {}) => {
      Object.keys(params).map(v => {
        if (v in this) {
          this[v] = params[v]
        } else {
          const temp = {}
          temp[v] = params[v]
          extendObservable(this, temp)
        }
      })
    }
    @action.bound loadData = async (param = {}) => {
      this.setStore({ loading: true })
      try {
        let res = await post(url, params)
        runInAction(() => {
          if (res.success) {
            this.setStore({
              dataSource
            })
          } else {
            message.destroy()
            message.error(res.msg)
          }
        })
      } catch (error) {
        console.log(error)
      }
      this.setStore({ loading: false })
    }
}

export default Store
