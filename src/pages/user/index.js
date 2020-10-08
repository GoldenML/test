/* eslint-disable react/no-deprecated */

import React, { Component } from 'react'
import { Menu, Spin, Layout } from 'antd'
import { WifiOutlined, AppstoreOutlined, SettingOutlined, CommentOutlined } from '@ant-design/icons'
import Store from './store'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Home from './home'
import Utils from '../../util/Utils'
import Main from './main'
import Forum from './forum'
const { SubMenu } = Menu
const { Content, Footer } = Layout
@inject('globalStore')
class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jbxx: {},
      loading: false,
      main: true,
      home: false,
      current: 'main'
    }
  }
  async componentWillMount() {
    if (!sessionStorage.getItem('token')) {
      this.props.history.push('/home')
    } else {
      await Store.getJbxx()
      if (Store.success) {
        this.setState({
          jbxx: Store.jbxx
        })
      } else {
        this.props.history.push('/home')
      }
    }
  }
  exit = () => {
    Utils.exit()
    this.props.history.goBack()
  }
  jump = (value) => {
    // window.location.replace('http://localhost:3000/user?page=' + value)
    switch (value) {
      case 'main':
        this.setState({
          main: true,
          home: false,
          forum: false,
        })
        break
      case 'home':
        this.setState({
          main: false,
          home: true,
          forum: false
        })
        break
      case 'forum':
        this.setState({
          main: false,
          home: false,
          forum: true
        })
        break
      default:
        break
    }
  }
  handleClick = (e) => {
    console.log(e.key)
    this.setState({ current: e.key })
  }
  render() {
    const { current } = this.state
    return (
      <Spin spinning={this.state.loading}>
        <Menu onClick={this.handleClick} selectedKeys={[current]} mode='horizontal'>
          <Menu.Item key='main' icon={<WifiOutlined />} onClick={() => this.jump('main')}>
            首页
          </Menu.Item>
          <Menu.Item key='app' icon={<CommentOutlined />} onClick={() => this.jump('forum')}>
            论坛
          </Menu.Item>
          <SubMenu key='SubMenu' icon={<SettingOutlined />} title='Navigation Three - Submenu'>
            <Menu.ItemGroup title='Item 1'>
              <Menu.Item key='setting:1'>Option 1</Menu.Item>
              <Menu.Item key='setting:2'>Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title='Item 2'>
              <Menu.Item key='setting:3'>Option 3</Menu.Item>
              <Menu.Item key='setting:4'>Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key='alipay' style={{ float: 'right' }}>
            <a onClick={this.exit}>
              注销
            </a>
          </Menu.Item>
          <Menu.Item key='home' style={{ float: 'right' }}>
            <a onClick={() => this.jump('home')}>
              {this.state.jbxx.name}
            </a>
          </Menu.Item>
        </Menu>
        {
          this.state.home && <Home />
        }
        {
          this.state.main && <Main />
        }
        {
          this.state.forum && <Forum />
        }

      </Spin>
    )
  }
}
export default withRouter(index)
