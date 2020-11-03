import React, { Component } from 'react'
import { Layout, Row, Col, Form } from 'antd'
import './style.css'
import ContentHeader from '../../components/ContentHeader'
import Store from './store'
const { Content, Footer } = Layout

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: window.getUrlParams('username')
    }
  }
  async componentWillMount() {
    let username = window.getUrlParams('username')
    await Store.getJbxx({ username })
    if (Store.success) {
      this.setState({
        jbxx: Store.jbxx
      })
    } else {
      window.close()
    }
  }
  render() {
    return (
      <div>
        <Layout>
          <Content>
            <div className='grhx'>
              <div className='jbxx'>
                <Row>
                  <ContentHeader>基本信息</ContentHeader>
                </Row>
                <Row>
                  <Col span={8} style={{ paddingTop: '5px' }}>
                    <span>姓名：</span>
                    <span>{this.state.jbxx?.name}</span>
                  </Col>
                  <Col span={8} style={{ paddingTop: '5px' }}>
                    <span>性别：</span>
                    <span>{this.state.jbxx?.gender}</span>
                  </Col>
                  <Col span={8} style={{ paddingTop: '5px' }}>
                    <span>年龄：</span>
                    <span>{this.state.jbxx?.age}</span>
                  </Col>
                  <Col span={8} style={{ paddingTop: '5px' }}>
                    <span>民族：</span>
                    <span>{this.state.jbxx?.nation}</span>
                  </Col>
                  <Col span={8} style={{ paddingTop: '5px' }}>
                    <span>手机号码：</span>
                    <span>{this.state.jbxx?.phone}</span>
                  </Col>
                  <Col span={8} style={{ paddingTop: '5px' }}>
                    <span>证件号码：</span>
                    <span>{this.state.jbxx?.zjhm}</span>
                  </Col>
                  <Col span={8} style={{ paddingTop: '5px' }}>
                    <span>籍贯：</span>
                    <span>{this.state.jbxx?.nativePlace}</span>
                  </Col>
                  <Col span={8} style={{ paddingTop: '5px' }}>
                    <span>居住地：</span>
                    <span>{this.state.jbxx?.address}</span>
                  </Col>
                  <Col span={8} style={{ paddingTop: '5px' }}>
                    <span>邮箱：</span>
                    <span>{this.state.jbxx?.email}</span>
                  </Col>
                </Row>
              </div>
              <div style={{ height: '20px' }}></div>
              <div className='coll'>
                <Row>
                  <ContentHeader>他的贡献</ContentHeader>
                </Row>
                <Row />

              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            曾经沧海难为水 除却巫山不是云
          </Footer>
        </Layout>
      </div>
    )
  }
}

export default index

