/* eslint-disable react/no-deprecated */
import React, { Component } from 'react'
import { Image, Row, Col, Button, Input, Modal, Form, Select } from 'antd'
import Header from './icon.jpeg'
import './style.css'
import Store from './store'
import { withRouter } from 'react-router-dom'
class index extends Component {
  formRef = React.createRef()
  constructor(props) {
    super(props)
    this.state = {
      grxx: {}
    }
  }
  async componentWillMount() {
    await Store.getJbxx({ username: this.props.username })
    this.setState({
      grxx: Store.grxx
    })
  }
  save = () => {
    const { getFieldValue, validateFields } = this.formRef.current
    validateFields().then(async values => {
      let params = {
        username: this.props.username,
        ...values
      }
      await Store.updateJbxx(params)
      if (Store.success) {
        this.setState({
          xgModal: false
        })
        await Store.getJbxx({ username: this.props.username })
        this.setState({
          grxx: Store.grxx
        })
      }
    })
  }
  render() {
    return (
      <>
        <div style={{ float: 'left', padding: '0px 30px 30px 0px' }}>
          <Image className='grxxheader' src={Header} alt='' />
        </div>
        <Row>
          <Col span={24} style={{ paddingTop: '5px' }}>
            <span>姓名：</span>
            <span>{this.state.grxx?.name}</span>
          </Col>
          <Col span={24} style={{ paddingTop: '5px' }}>
            <span>性别：</span>
            <span>{this.state.grxx?.gender}</span>
          </Col>
          <Col span={24} style={{ paddingTop: '5px' }}>
            <span>年龄：</span>
            <span>{this.state.grxx?.age}</span>
          </Col>
          <Col span={24} style={{ paddingTop: '5px' }}>
            <span>民族：</span>
            <span>{this.state.grxx?.nation}</span>
          </Col>
          <Col span={24} style={{ paddingTop: '5px' }}>
            <span>手机号码：</span>
            <span>{this.state.grxx?.phone}</span>
          </Col>
          <Col span={24} style={{ paddingTop: '5px' }}>
            <span>证件号码：</span>
            <span>{this.state.grxx?.zjhm}</span>
          </Col>
          <Col span={24} style={{ paddingTop: '5px' }}>
            <span>籍贯：</span>
            <span>{this.state.grxx?.nativePlace}</span>
          </Col>
          <Col span={24} style={{ paddingTop: '5px' }}>
            <span>居住地：</span>
            <span>{this.state.grxx?.address}</span>
          </Col>
          <Col span={24} style={{ paddingTop: '5px' }}>
            <span>邮箱：</span>
            <span>{this.state.grxx?.email}</span>
          </Col>
          <Col style={{ paddingTop: '20px' }}>
            <Button onClick={() => { this.setState({ xgModal: true }) }} type='primary' style={{ width: '100px', height: '32px' }}>编辑资料</Button>
          </Col>
        </Row>
        <Modal maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          width='500px'
          title='资料修改'
          visible={this.state.xgModal}
          footer={null}
          maskClosable={false}
          destroyOnClose
          centered
          onCancel={() => { this.setState({ xgModal: false }) }}
        >
          <Form ref={this.formRef}>
            <Row>
              <Col span={24}>
                <Form.Item name='name' label='姓名' required={false} initialValue={this.state.grxx?.name} rules={[{ required: true, message: '请输入姓名' }]}>
                  <Input placeholder='请输入' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='gender' label='性别' required={false} initialValue={this.state.grxx?.gender} rules={[{ required: true, message: '请选择性别' }]} >
                  <Select placeholder='请选择' >
                    <Select.Option value='男'>男</Select.Option>
                    <Select.Option value='女'>女</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='age' label='年龄' initialValue={this.state.grxx?.age} required={false} >
                  <Input placeholder='请输入' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='nation' label='民族' initialValue={this.state.grxx?.nation} required={false}>
                  <Input placeholder='请输入' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='phone' label='手机号码' initialValue={this.state.grxx?.phone} required={false}>
                  <Input placeholder='请输入' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='zjhm' label='证件号码' initialValue={this.state.grxx?.zjhm} required={false}>
                  <Input placeholder='请输入' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='nativePlace' label='籍贯' initialValue={this.state.grxx?.nativePlace} required={false}>
                  <Input placeholder='请输入' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='address' label='居住地' initialValue={this.state.grxx?.address} required={false}>
                  <Input placeholder='请输入' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='email' label='邮箱' initialValue={this.state.grxx?.email}>
                  <Input placeholder='请输入' type='email' />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Button type='primary' style={{ minWidth: '80px', height: '31px', marginRight: '12px' }} onClick={this.save}>保存</Button>
            <Button type='danger' style={{ width: '80px', height: '31px', marginLeft: '12px' }} onClick={() => { this.setState({ xgModal: false }) }}>取消</Button>
          </div>
        </Modal>
      </>
    )
  }
}

export default withRouter(index)
