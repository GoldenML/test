import React, { Component } from 'react'
import YTable from '../YTable'
class index extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.shareTableRef = this.tableRef
  }
  openGrhx = (username) => {
    window.open('/grhx?username=' + username)
  }
  download = (record) => {
    window.location.href = encodeURI(`http://8.129.76.21:8080${record.filePath}?download=0`)
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
      fid: record.fid,
      cz,
    }
    await Store.cz(params)
    // this.tableRef.loadData(url, paramss)
  }
  render() {
    const columns1 = [
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
    const columns2 = [
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
      columns: this.props.xgbz ? columns2 : columns1,
      url: apiPath.GET_FILE_CX,
      params: {

      },
      scroll: { x: 800 }
    }
    return (
      <div>
        <YTable ref={ref => { this.tableRef = ref }} {...config} />
      </div>
    )
  }
}

export default index
