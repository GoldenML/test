import React, { Component } from 'react'
import { Select } from 'antd'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { post } from 'Util/request'
export class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
    }
  }
  componentDidMount() {
    const { dataSource, url, params } = this.props
    if (dataSource) {

    } else {
      if (url) {
        post(url, params).then((data) => {
          console.log('data ===>', data)
          if (data) {
            this.setState({
              dataSource: data?.results
            })
          }
        })
      }
    }
  }
  onSearch = (value) => {
    const { url, params, searchKey } = this.props
    if (url) {
      post(url, { ...params, [searchKey]: value }).then((data) => {
        console.log('data ===>', data)
        if (data.success) {
          this.setState({
            dataSource: data?.results
          })
        }
      })
    }
  }
  onChange = (value, option) => {
    console.log('value ===>', value)
    console.log('option ===>', option)
    const { onChange } = this.props
    if (onChange) {
      onChange(value, option)
    }
  }
  render() {
    const { defaultValue, dataSource, valueKey, nameKey, searchKey, size, placeholder, ...options } = this.props
    const { open } = this.state
    return (
      <Select
        size={size || 'default'}
        defaultValue={defaultValue}
        placeholder={placeholder || '请选择'}
        onDropdownVisibleChange={(open) => this.setState({ open })}
        suffixIcon={open ? <CaretUpOutlined /> : <CaretDownOutlined />}
        onChange={(value, option) => this.onChange(value, option)}
        defaultActiveFirstOption={false}
        onSearch={(value) => this.onSearch(value)}
        {...options}
      >
        {
          dataSource ? dataSource.map((item, index) => {
            return <>
              <Select.Option
                key={index}
                value={item[valueKey]}
              >{item[nameKey]}</Select.Option>
            </>
          }) : this.state.dataSource.map((item, index) => {
            return <>
              <Select.Option
                key={index}
                value={item[valueKey]}
              >{item[nameKey]}</Select.Option>
            </>
          })
        }
      </Select>
    )
  }
}

export default index
