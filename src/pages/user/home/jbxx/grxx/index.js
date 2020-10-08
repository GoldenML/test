/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
import { Image } from 'antd'
import Header from './icon.jpeg'
import './style.css'
import Store from './store'
import { withRouter } from 'react-router-dom'
class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grxx: {}
    }
  }
  async componentWillMount() {
    await Store.getJbxx()
    if (Store.success) {
      this.setState({
        grxx: Store.grxx
      })
    } else {
      this.props.history.push('/home')
    }
  }
  render() {
    return (
      <>
        <div style={{ float: 'left', padding: '0px 30px 30px 0px' }}>
          <Image className='grxxheader' src={Header} alt='' />
        </div>
        <div>
          姓名：<span style={{ color: '#4A90E2' }}>{this.state.grxx.name}</span>
        </div>
      </>
    )
  }
}

export default withRouter(index)
