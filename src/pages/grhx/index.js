/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
import { Layout, Form, Row, Col } from 'antd'
import './style.css'
const { Content, Footer } = Layout
class index extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount() {
    console.log('username', getUrlParams('username'))
    this.setState({
      username: getUrlParams('username')
    })
  }
  render() {
    return (
      <Layout>
        <Content>
          <div className='grhx'>
            <Form >
              <Row>
                <Col>
                  <span>姓名：</span>
                  <span>{this.state.username}</span>
                </Col>
              </Row>
            </Form>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Epoch ©2020 Created by Yang Hui
        </Footer>
      </Layout>
    )
  }
}

export default index
