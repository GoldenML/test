import React, { Component } from 'react'
import { Form, Row, Col, Layout } from 'antd'
import './style.css'
import Test from '../../components/Test'
const { Content, Footer } = Layout
class index extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <Layout>
        <Content>
          <div className='forum'>
            <Form ref={this.formRef}>
              <Row>
                <Col>
                  <Test />
                </Col>
              </Row>
            </Form>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          曾经沧海难为水 除却巫山不是云
        </Footer>
      </Layout>
    )
  }
}

export default index
