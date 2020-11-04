import React, { Component } from 'react'
import { Form, Row, Col, Layout, Card, message, Input, Button, Modal } from 'antd'
import './style.css'
import Test from '../../components/Test'
import { lcStorage } from 'Util/storage'
import Store from './store'
const { Search, TextArea } = Input
const { Content, Footer } = Layout
class index extends Component {
  formRef = React.createRef()
  constructor(props) {
    super(props)
    this.state = {
      dataSource: []
    }
  }
  componentDidMount() {
    this.tzcx()
  }
  onClick = () => {
    message.info('hello')
  }
  jumpHx = (username) => {
    window.open('/grhx?username=' + username)
  }
  onSearch = (v) => {
    console.log(v)
    this.tzcx(v)
  }
  tzcx = async (v) => {
    let params = {
      keywords: v || ''
    }
    await Store.postFind(params)
    await this.setState({
      dataSource: Store.data
    })
  }
  publish = () => {
    const { validateFields } = this.formRef.current
    validateFields().then(async (values) => {
      let params = {
        ...values,
        author: lcStorage.getItem('username')
      }
      await Store.publish(params)
      if (Store.success) {
        await this.setState({
          tzModal: false
        })
        this.tzcx()
      }
    })
  }
  render() {
    return (
      <>
        <Layout>
          <Content>
            <div className='forum'>
              <Form ref={this.formRef}>
                <Row style={{ paddingBottom: '10px' }}>
                  <Col span={8}>
                    <Search placeholder='搜索' onSearch={this.onSearch} enterButton />
                  </Col>
                  <Col span={16} style={{ textAlign: 'right' }}>
                    <Button type='primary' onClick={() => this.setState({ tzModal: true })}>发表帖子</Button>
                  </Col>
                </Row>

                {
                  this.state.dataSource.map((item, index) => {
                    return (
                      <Row style={index === this.state.dataSource.length - 1 ? { paddingBottom: '0px' } : { paddingBottom: '20px' }} key={index}>
                        <Col span={24} >
                          <Card extra={<a onClick={() => this.jumpHx(item.author)}>{item.xingming}</a>} size='small' title={<a onClick={this.onClick}>{item.title}</a>} hoverable><a onClick={this.onClick}>{item.content}</a></Card>
                        </Col>
                      </Row>
                    )
                  })
                }
              </Form>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            曾经沧海难为水 除却巫山不是云
          </Footer>
        </Layout>
        <Modal
          maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          width='500px'
          title='帖子'
          visible={this.state.tzModal}
          footer={null}
          maskClosable={false}
          destroyOnClose
          centered
          onCancel={() => { this.setState({ tzModal: false }) }}
        >
          <Form ref={this.formRef}>
            <Row>
              <Col span={24}>
                <Form.Item name='title' label='标题' rules={[{ required: true, message: '请输入标题' }]}>
                  <Input style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='content' label='内容' rules={[{ required: true, message: '请输入内容' }]}>
                  <TextArea style={{ width: '100%' }} maxLength={300} autoSize />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'center' }}>
                <Button onClick={this.publish} type='primary' style={{ width: '80px' }}>发表</Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </>
    )
  }
}

export default index
