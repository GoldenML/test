import React, { Component } from 'react'
import YTable from 'Components/YTable'
import { Layout, Form, Row, Col, Divider, DatePicker, Input } from 'antd'
import './style.css'
import CheckableTag from 'Components/CheckBoxTag'
import apiPath from 'Common/apiPath'
import { StarOutlined, FrownOutlined, SmileOutlined, StarTwoTone, SmileTwoTone, FrownTwoTone, LikeTwoTone, DislikeTwoTone } from '@ant-design/icons'
import Store from './store'
import moment from 'moment'
import { lcStorage } from 'Util/storage'
const { Header, Content, Footer, Sider } = Layout
const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD'
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
      contributor: '',
      lxSelected: '',
    }
  }
  componentDidMount() {
    this.allfilecx()
  }
  allfilecx = () => {
    let url = apiPath.GET_All_FILE_CX
    let params = {
      username: lcStorage.getItem('username'),
      fileType: this.state.lxSelected || undefined,
      startTime: this.state.startTime || undefined,
      endTime: this.state.endTime || undefined,
      contributor: this.state.contributor,
      page: 1,
    }
    this.tableRef.loadData(url, params)
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
    let url = apiPath.GET_All_FILE_CX
    let params = {
      fileType: this.state.lxSelected || undefined,
      startTime: this.state.startTime || undefined,
      endTime: this.state.endTime || undefined,
      contributor: this.state.contributor,
      page: 1,
    }
    this.tableRef.loadData(url, params)
  }
  cz = async (record, cz, index) => {
    if (cz === 'star') {
      if (record.star === 'star') {
        record.starNum -= 1
        record.star = ''
      } else {
        record.starNum += 1
        record.star = 'star'
      }
    } else if (cz === 'good') {
      if (record.cz === 'good') {
        record.goodNum -= 1
        record.cz = ''
      } else if (record.cz === 'bad') {
        record.cz = 'good'
        record.goodNum += 1
        record.badNum -= 1
      } else {
        record.cz = 'good'
        record.goodNum += 1
      }
    } else if (cz === 'bad') {
      if (record.cz === 'bad') {
        record.badNum -= 1
        record.cz = ''
      } else if (record.cz === 'good') {
        record.cz = 'bad'
        record.badNum += 1
        record.goodNum -= 1
      } else {
        record.cz = 'bad'
        record.badNum += 1
      }
    }
    let _this = this.tableRef
    await _this.state.dataSource.splice(index, 1, record)
    console.log(_this.state.dataSource)
    this.tableRef.setState({
      dataSource: _this.state.dataSource
    })
    let params = {
      username: lcStorage.getItem('username'),
      fid: record.fid,
      cz,
    }
    await Store.cz(params)
    // this.tableRef.loadData(url, paramss)
  }
  openGrhx = (username) => {
    window.open('/grhx?username=' + username)
  }
  scrqChange = async (date) => {
    console.log(date)
    if (date) {
      await this.setState({
        startTime: moment(date[0]).format(dateFormat),
        endTime: moment(date[1]).format(dateFormat),
      })
    } else {
      await this.setState({
        startTime: undefined,
        endTime: undefined,
      })
    }
    await this.allfilecx()
  }
  conBlur = async (v) => {
    const { getFieldValue } = this.formRef.current
    if (this.state.contributor === v.target.value) {
      return
    }
    await this.setState({
      contributor: v.target.value || ''
    })
    await this.allfilecx()
  }
  download = (record) => {
    window.open(`http://8.129.76.21:8080${record.filePath}?download=0`)
    // window.location.href = encodeURI(`http://8.129.76.21:8080${record.filePath}?download=0`)
    // window.parent.postMessage({
    //   'type': 'downLoadFile',
    //   'fileName': downLoadFile.filename,
    //   'fileUrl': `http://8.129.76.21:8080${record.filePath}?download=0`,
    // }, '*')
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
        width: 100,
        render: (item, record) => {
          return (
            <a onClick={() => this.openGrhx(record.contributor)}>{item}</a>
          )
        }
      }, {
        title: '类型',
        dataIndex: 'fileType',
        ellipsis: true,
        width: 150,
        render: (text, record) => {
          return this.state.dataSource.filter(item => item.bm === text)[0].mc
        }
      }, {
        title: '文件名',
        dataIndex: 'fileName',
        ellipsis: true,
        width: 150,
        render: (item, record) => {
          return <>
            <a onClick={() => this.download(record)}>
              {`${item}`.substring(0, `${item}`.lastIndexOf('.'))}
            </a>
          </>
        }
      }, {
        title: '收藏',
        dataIndex: 'starNum',
        width: 100,
        align: 'right',
        sorter: {
          compare: (a, b) => a.starNum - b.starNum,
        },
      }, {
        title: '赞',
        dataIndex: 'goodNum',
        width: 100,
        align: 'right',
        sorter: {
          compare: (a, b) => a.goodNum - b.goodNum,
        },
      }, {
        title: '踩',
        dataIndex: 'badNum',
        width: 100,
        align: 'right',
        sorter: {
          compare: (a, b) => a.badNum - b.badNum,
        },
      }, {
        title: '操作',
        dataIndex: 'cz',
        fixed: 'right',
        align: 'center',
        width: 120,
        render: (item, record) => {
          return (
            <>
              <a onClick={() => { this.cz(record, 'star', index) }} title='收藏'><StarTwoTone twoToneColor={record.star === 'star' ? 'eb2f96' : 'grey'} /></a>
              <Divider type='vertical' />
              <a onClick={() => { this.cz(record, 'good', index) }} title='喜欢'><LikeTwoTone twoToneColor={record.cz === 'good' ? 'eb2f96' : 'grey'} /></a>
              <Divider type='vertical' />
              <a onClick={() => { this.cz(record, 'bad', index) }} title='不喜欢'><DislikeTwoTone twoToneColor={record.cz === 'bad' ? 'eb2f96' : 'grey'} /></a>
            </>
          )
        }
      }
    ]
    const config = {
      columns,
      rowKey: 'fid',
      scroll: { x: 800 }
    }
    return (
      <Layout>
        <Content>
          <div className='main'>
            <Form ref={this.formRef}>
              <Row>
                <Col>
                  <Form.Item label='类型' name='lx'>
                    <CheckableTag dataSource={this.state.dataSource} onChange={this.lxChange} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Form.Item label='上传日期' name='scrq'>
                    <RangePicker format={dateFormat} onChange={this.scrqChange} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='贡献者' name='contributor'>
                    <Input placeholder='请输入' className='basic' onBlur={this.conBlur} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <YTable ref={ref => { this.tableRef = ref }} {...config} />
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
