import React, { Component } from 'react'
import { Form, Input, Row, Col, Button, message } from 'antd'
import Store from './store'
import Utils from 'Util/Utils'
import { lcStorage } from 'Util/storage'

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
class index extends Component {
    formRef = React.createRef()
    constructor(props) {
      super(props)
      this.state = {

      }
    }
    onSubmit = () => {
      const { getFieldValue, validateFields, resetFields } = this.formRef.current
      validateFields().then(async values => {
        if (values.oldPassword === values.newPassword) {
          message.destroy()
          message.warning('新密码不能与旧密码一致！')
          return
        }
        let params = {
          username: lcStorage.getItem('username'),
          oldPassword: values.oldPassword,
          newPassword: values.newPassword
        }
        await Store.xgmm(params)
        if (Store.success) {
          resetFields()
        } else {
          if (Store.ret === 2) {
            Utils.exit()
            this.props.history.push('/home')
          }
        }
      }).catch(errorInfo => {
        console.log(errorInfo)
      })
    }
    pwValidate = (rule, value, callback) => {
      const { getFieldValue, validateFields } = this.formRef.current
      if (value && getFieldValue('reNewPassword')) {
        if (value !== getFieldValue('reNewPassword')) {
          callback('新密码不一致')
          this.setState({
            flag: false
          })
        } else {
          if (!this.state.flag) {
            this.setState({
              flag: true
            })
            validateFields(['reNewPassword'], callback).then(async values => {

            }).catch(errorInfo => {
              console.log(errorInfo)
            })
          }
          callback()
        }
      }
    }
    repwValidate = (rule, value, callback) => {
      const { getFieldValue, validateFields } = this.formRef.current
      if (value && getFieldValue('newPassword') && value !== getFieldValue('newPassword')) {
        this.setState({
          flag: false
        })
        callback('新密码不一致')
      } else {
        if (!this.state.flag) {
          this.setState({
            flag: true
          })
          validateFields(['newPassword'], callback).then(async values => {
          }).catch(errorInfo => {
            console.log(errorInfo)
          })
        }
        callback()
      }
    }
    render() {
      const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      }
      return (
        <div>
          <Form ref={this.formRef}>
            <Row justify='center' >
              <Col span={10}>
                <Form.Item required={false} {...layout} name='oldPassword' label='请输入原密码' rules={[{ required: true, message: '必输' }]}>
                  <Input className='basic' maxLength={30} type='password' style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='center' >
              <Col span={10}>
                <Form.Item required={false} {...layout} name='newPassword' label='请输入新密码' rules={[{ required: true, message: '必输' }, { validator: (rule, value, callback) => { this.pwValidate(rule, value, callback) } }]} validateFirst>
                  <Input className='basic' maxLength={30} type='password' style={{ width: '100%' }} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='center' >
              <Col span={10}>
                <Form.Item required={false} {...layout} name='reNewPassword' label='请再次输入新密码' rules={[{ required: true, message: '必输' }, { validator: (rule, value, callback) => { this.repwValidate(rule, value, callback) } }]} validateFirst>
                  <Input className='basic' maxLength={30} type='password' style={{ width: '100%' }} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='center' >
              <Col span={10} style={{ textAlign: 'center' }}>
                <Button type='primary' style={{ width: '100px' }} onClick={this.onSubmit}>确认</Button>
              </Col>
            </Row>
          </Form>
        </div>
      )
    }
}

export default index
