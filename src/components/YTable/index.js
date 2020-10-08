/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
import { Table } from 'antd'
import './style.css'
import Store from './store'
import { post } from '../../util/request'

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      pagination: {
        current: 1,
        pageSize: 10,
        size: 'small',
        showTitle: true,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
      },
    }
  }
  loadData = async (url, params) => {
    const { pagination } = this.state
    console.log('this.state===', this.state, params)
    let param = {
      page: pagination.current,
      size: pagination.pageSize,
      ...params,
    }
    console.log(pagination.current)
    await post(url, param).then(async (res) => {
      console.log('res', res)
      let data = res.resultList
      await data.map((item, index) => {
        item.numberer = ((params.page ? params.page : pagination.current) - 1) * 10 + index + 1
      })
      console.log(param.page)
      await this.setState({
        url: url,
        params: param,
        dataSource: data,
        pagination: {
          ...pagination,
          current: params.page ? params.page : param.page,
          total: res.totalCount
        }
      })
    })
  }

  handleChange = async (pagination) => {
    console.log('pagination', pagination)
    await this.setState({
      pagination
    })
    const { url, params } = this.state
    const { page, size, ...param } = params
    this.loadData(url, param)
  }
  render() {
    const { ...props } = this.props
    const { dataSource, pagination } = this.state
    return (
      <Table
        size='default'
        pagination={pagination}
        dataSource={dataSource}
        onChange={this.handleChange}
        className='ytable'
        {...props}
      />
    )
  }
}

export default index
