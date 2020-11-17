import React, { Component } from 'react'
import { Button, Row, Col, Input, Form } from 'antd'
import Store from './store'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import img from './preview.jpg'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import { FormInstance } from 'antd/lib/form'
import { lcStorage } from 'Util/storage'
@inject('globalStore')
class index extends Component {
  formRef = React.createRef()
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  click = async () => {
    console.log('this.formRef.current', this.formRef.current)
    const { getFieldValue, validateFields } = this.formRef.current
    validateFields().then(async values => {
      let params = {
        username: getFieldValue('username'),
        password: getFieldValue('password')
      }
      await Store.login(params)
      if (Store.success) {
        console.log(lcStorage)
        lcStorage.setItem('username', getFieldValue('username'))
        lcStorage.setItem('token', `20180304${moment().format('YYYYMMDDHHMMSS')}`, 60 * 1000 * 10)
        // sessionStorage.setItem('token', `20180304${moment().format('YYYYMMDDHHMMSS')}`)
        setTimeout(() => {
          this.props.history.push({
            pathname: '/user',
            state: {
              username: getFieldValue('username')
            }
          })
        }, 1000)
      }
    }).catch(errorInfo => {
      console.log(errorInfo)
    })
  }
  render() {
    return (
      <div style={{ minHeight: '100vh', backgroundImage: `url(${img})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }}>
        <div style={{ margin: 'auto',
          position: 'absolute',
          top: '40%', left: 0, right: 0 }}
        >
          <Form requiredMark name='basic' ref={this.formRef} className='login-form'>
            <Row justify='center' >
              <Col span={8}>
                <Form.Item name='username' rules={[{ required: true, message: 'please input your username' }]}>
                  <Input style={{ width: '100%' }} prefix={<UserOutlined className='site-form-item-icon' />} placeholder='username' />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='center' style={{ paddingTop: '10px' }}>
              <Col span={8} >
                <Form.Item name='password' rules={[{ required: true, message: 'please input your password' }]} >
                  <Input style={{ width: '100%' }} placeholder='password' type='password' prefix={<LockOutlined className='site-form-item-icon' />} />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='center' style={{ paddingTop: '10px' }}>
              <Col span={8} style={{ textAlign: 'center' }}>
                <Button style={{ width: '100px', height: '30px' }} type='primary' onClick={this.click}>测试</Button>
              </Col>
            </Row>

          </Form>
          {/* <F1 /> */}
          {/* <FriendStatus /> */}
        </div>

      </div>

    )
  }
}

export default withRouter(index)
