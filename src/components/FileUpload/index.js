import React, { Component } from 'react'
import { Upload, Button, message, Progress } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import './style.css'
import apiPath from '../../common/apiPath'
class index extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  handleChange = (res) => {
    if (res.file.status === 'loading') {

    } else {
      this.setState({
        uploading: false
      })
      if (res.file.status === 'done') {
        console.log('上传完成！', res)
        if (res.file.response.success) {
          this.props.onChange(res.file)
        } else {
          message.destroy()
          message.error(res.file.response.msg)
        }
      }
    }
  }
  render() {
    const { ...props } = this.props
    return (
      <>
        <Upload
          // showUploadList={this.state.show}
          method='post'
          action={apiPath.GET_FILE_UPLOAD_ZC}
          name='file'
          {...props}
          className='fileUpload'
          onChange={this.handleChange}
        >
          <Button icon={<UploadOutlined />}>上传文件</Button>
        </Upload>
        {
          this.state.uploading && <Progress style={{ width: '150px' }} percent={this.state.percent} />
        }
      </>
    )
  }
}

export default index
