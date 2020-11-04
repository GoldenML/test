import React, { Component } from 'react'
import { Avatar, Tag, Form, Row, Col, Table, Upload, Button, Divider, Modal, Progress, message } from 'antd'
import { UserOutlined, UploadOutlined } from '@ant-design/icons'
import './style.css'
import YTable from 'Components/YTable'
import CheckBoxTag from 'Components/CheckBoxTag'
import FileUpload from 'Components/FileUpload'
import apiPath from 'Common/apiPath'
import { withRouter } from 'react-router-dom'
import Utils from 'Util/Utils'
import { lcStorage } from 'Util/storage'
import Store from './store'
const { CheckableTag } = Tag
class index extends Component {
  formRef = React.createRef()
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [
        {
          bm: '01',
          mc: '计算机'
        }, {
          bm: '02',
          mc: '数学'
        }
      ],
      lxSelected: ''
    }
  }
  componentDidMount() {
    this.filecx()
  }
  lxChange = async (data) => {
    let selected = ''
    await data.map((item, index) => {
      selected += item + ','
    })
    await this.setState({
      lxSelected: selected.substring(0, selected.length - 1)
    })
    console.log('lxSelected', this.state.lxSelected)
    let url = apiPath.GET_FILE_CX
    let params = {
      fileType: this.state.lxSelected || undefined
    }
    this.tableRef.loadData(url, params)
  }
  sclxChange = async (data) => {
    let selected = ''
    await data.map((item, index) => {
      selected += item + ','
    })
    this.setState({
      sclxSelected: selected.substring(0, selected.length - 1)
    })
  }
  filecx = () => {
    let url = apiPath.GET_FILE_CX
    let params = {
      contributor: lcStorage.getItem('username'),
      fileType: this.state.lxSelected || undefined,
    }
    this.tableRef.loadData(url, params)
  }
  download = (filePath) => {
    window.location.href = encodeURI(`http://8.129.76.21:8080${filePath}?download=0`)
  }
  filedel = async (fid) => {
    this.setState({
      sc: true,
      fid: fid
    })
  }
  handleOk = async() => {
    let params = {
      fid: this.state.fid
    }
    await Store.filedel(params)
    if (!Store.success) {
      if (Store.ret === 2) {
        Utils.exit()
        this.props.history.push('/home')
      }
    } else {
      this.filecx()
    }
    this.setState({
      sc: false,
      fid: ''
    })
  }
  scwjCancel = () => {
    this.setState({
      scwj: false,
      uuid: undefined,
    })
  }
  scCancel = () => {
    this.setState({
      sc: false,
      fid: '',
      sclxSelected: ''
    })
  }
  scwj = async () => {
    const { validateFields } = this.formRef.current
    if (!this.state.sclxSelected) {
      message.destroy()
      message.warning('请选择类型！')
      return
    }
    if (!this.state.uuid) {
      message.destroy()
      message.warning('请上传文件！')
      return
    }
    validateFields(['sclx']).then(async (val) => {
      let params = {
        uuid: this.state.uuid
      }
      await Store.upload(params)
      if (Store.success) {
        this.filecx()
      } else {
        if (Store.ret === 2) {
          Utils.exit()
          this.props.form.push('/home')
        }
      }
      this.setState({
        scwj: false,
        uuid: '',
        sclxSelected: ''
      })
    })
  }
  fileChange = (file) => {
    this.setState({
      uuid: file.response.data
    })
  }
  render() {
    const columns = [
      {
        title: '',
        dataIndex: 'numberer',
        width: 70
      },
      {
        title: '上传时间',
        dataIndex: 'uploadTime',
        width: 150
      },
      {
        title: '贡献者',
        dataIndex: 'xingming',
        width: 100
      }, {
        title: '文件名',
        dataIndex: 'fileName',
        ellipsis: true,
        width: 150,
        render: (item, record) => (`${item}`.substring(0, `${item}`.lastIndexOf('.')))
      }, {
        title: '收藏',
        dataIndex: 'starNum',
        width: 100,
        align: 'right'
      }, {
        title: '赞',
        dataIndex: 'goodNum',
        width: 100,
        align: 'right'
      }, {
        title: '踩',
        dataIndex: 'badNum',
        width: 100,
        align: 'right'
      }, {
        title: '操作',
        dataIndex: 'cz',
        fixed: 'right',
        width: 120,
        align: 'center',
        render: (item, record) => {
          return (
            <>
              <a onClick={() => { this.download(record.filePath) }}>下载</a>
              <Divider type='vertical' />
              <a onClick={() => { this.filedel(record.fid) }} style={{ color: '#D0021B' }}>删除</a>
            </>
          )
        }
      }
    ]
    const config = {
      url: apiPath.GET_FILE_CX,
      params: {

      },
      columns,
      scroll: { x: 800 }
    }
    return (
      <>
        <Form ref={this.formRef}>
          <Row>
            <Col>
              <Form.Item name='lx' label='类型'>
                <CheckBoxTag dataSource={this.state.dataSource} onChange={this.lxChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right', paddingBottom: '20px' }}>
              <Button style={{ width: '100px' }} type='primary' onClick={() => { this.setState({ scwj: true }) }}>上传文件</Button>
            </Col>
          </Row>
          <Row>
            <YTable ref={ref => { this.tableRef = ref }} {...config} />
          </Row>
        </Form>
        <Modal maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          width='800px'
          title='上传文件'
          visible={this.state.scwj}
          footer={null}
          maskClosable={false}
          destroyOnClose
          centered
          onCancel={() => { this.scwjCancel() }}
        >
          <Row>
            <Col span={24}>
              <Form.Item name='sclx' required={false} label='类型' rules={[{ required: true, message: '*请选择类型' }]}>
                <CheckBoxTag dataSource={this.state.dataSource} single onChange={this.sclxChange} />
              </Form.Item>
            </Col>
          </Row>
          {
            this.state.sclxSelected && <Row>
              <Col span={24} style={{ textAlign: 'left' }}>
                <FileUpload data={{ uuid: this.state.uuid || '', fileType: this.state.sclxSelected || '' }} onChange={this.fileChange} />
              </Col>
            </Row>
          }
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Button type='primary' style={{ minWidth: '80px', height: '31px', marginRight: '12px' }} onClick={this.scwj}>保存</Button>
            <Button type='danger' style={{ width: '80px', height: '31px', marginLeft: '12px' }} onClick={this.scwjCancel}>取消</Button>
          </div>
        </Modal>
        <Modal
          maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          width='400px'
          title='提醒'
          visible={this.state.sc}
          footer={null}
          maskClosable={false}
          destroyOnClose
          centered
          onCancel={() => { this.scCancel() }}
        >
          <div>
            <Row>
              <div style={{ color: '#333333' }}>确定要删除此文件吗?</div>
            </Row>
            <div style={{ textAlign: 'right', marginTop: '40px' }}>
              <Button type='primary' style={{ minWidth: '80px', height: '31px', marginRight: '12px' }} onClick={this.handleOk}>确定</Button>
              <Button type='danger' style={{ width: '80px', height: '31px', marginLeft: '12px' }} onClick={this.scCancel}>取消</Button>
            </div>
          </div>
        </Modal>
      </>
    )
  }
}

export default withRouter(index)
