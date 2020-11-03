
import React, { Component } from 'react'
import { Layout, Menu, Button } from 'antd'
import { StarOutlined, UserOutlined, TeamOutlined, FolderAddOutlined, EyeOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons'
import Store from './store'
import { withRouter } from 'react-router-dom'
import Xgmm from './jbxx/xgmm'
import Grxx from './jbxx/grxx'
import './style.css'
import Utils from '../../../util/Utils'
import MyShare from './myShare'
const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout
class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grxx: true,
      xgmm: false,
      myShare: false
    }
  }
  show = (modal) => {
    switch (modal) {
      case 'grxx':
        this.setState({
          grxx: true,
          xgmm: false,
          myShare: false
        })
        break
      case 'xgmm':
        this.setState({
          grxx: false,
          xgmm: true,
          myShare: false
        })
        break
      case 'myShare':
        this.setState({
          grxx: false,
          xgmm: false,
          myShare: true
        })
        break
      default:
        break
    }
  }
  logout = () => {
    Utils.exit()
    this.props.history.push('/home')
  }
  render() {
    return (
      <>
        <Layout>
          <Sider
            breakpoint='lg'
            collapsedWidth='0'
          >
            <Menu
              theme='dark'
              onClick={this.handleClick}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['jbxx']}
              mode='inline'
            >
              <SubMenu
                key='jbxx'
                title={
                  <span>
                    <UserOutlined />
                    <span>基本信息</span>
                  </span>
                }
              >
                <Menu.Item key='1' onClick={() => { this.show('grxx') }}><UserOutlined />个人信息</Menu.Item>
                <Menu.Item key='2' onClick={() => { this.show('xgmm') }}><EditOutlined />修改密码</Menu.Item>
                <Menu.Item key='3' onClick={this.logout}><LogoutOutlined />注销</Menu.Item>
              </SubMenu>
              <Menu.Item key='5' onClick={() => { this.show('myShare') }}><TeamOutlined />我的共享</Menu.Item>
              <Menu.Item key='4'><StarOutlined />我的收藏</Menu.Item>
              <Menu.Item key='6'><EyeOutlined />我的关注</Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            {/* <Xgmm /> */}
            <Content style={{ margin: '24px 16px 0' }}>
              <div className='home'>
                {
                  this.state.xgmm && <Xgmm username={this.props.username} />
                }
                {
                  this.state.grxx && <Grxx username={this.props.username} />
                }
                {
                  this.state.myShare && <MyShare username={this.props.username} />
                }
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>曾经沧海难为水 除却巫山不是云</Footer>
          </Layout>
        </Layout>
      </>
    )
  }
}

export default withRouter(index)
