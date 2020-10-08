import React, { Component } from 'react'
import { Tag } from 'antd'
import './style.less'
const { CheckableTag } = Tag
class index extends Component {
    state={

    }
    render() {
      return (
        <>
          <CheckableTag className='check'>
            hello
          </CheckableTag>
        </>
      )
    }
}

export default index
