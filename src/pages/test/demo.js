import React, { Component, Fragment } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './style.css'
import YSelect from 'Components/YSelect'
import YComment from 'Components/YComment'
import { Col, Card } from 'antd'
import { CaretUpOutlined } from '@ant-design/icons'

class demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      arr: '你一生清澈明朗，目光所及皆是善良',
      data: [{ plz: '洪玄玄', content: '我厉害', comment: [{ plz: '洪玄玄', content: '我厉害二号' }] }, { plz: '洪玄玄', content: '我牛逼' }, { plz: '洪玄玄', content: '我帅气' }, { plz: '洪玄玄', content: '我最美' }, { plz: '洪玄玄', content: '我最靓' }]
    }
    this.handleAddItem = this.handleAddItem.bind(this)
  }
  componentDidMount() {
    // this.entered()
  }
  entered = async () => {
    console.log(this.state.arr.split(''))
    this.setState({
      title: '愿'
    })
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    for (let index = 0; index < this.state.arr.split('').length; index++) {
      let item = this.state.arr.split('')[index]
      await delay(200)
      const lm = this.state.title
      this.setState({
        title: lm + item
      })
    }
  }
  add = (item) => {

  }
  /**
   * 评论
   */
  reply = async (index) => {
    await this.resetEditor()
    let { data } = this.state
    let element = data[index]
    element = {
      ...element,
      editor: true
    }
    data.splice(index, 1, element)
    this.setState({
      data
    })
  }
  /**
   * 评论回复
   */
  commentReply = async (index, i) => {
    await this.resetEditor()
    let { data } = this.state
    let arr = data[index].comment
    let element = arr[i]
    element = {
      ...element,
      editor: true
    }
    arr.splice(i, 1, element)
    this.setState({
      data
    })
  }
  /**
   * 重置编辑框
   */
  resetEditor = async () => {
    let { data } = this.state
    for (let index = 0; index < data.length; index++) {
      if (data[index].comment) {
        for (let i = 0; i < data[index].comment.length; i++) {
          let arr = data[index].comment
          let element = arr[i]
          element = {
            ...element,
            editor: false
          }
          arr.splice(i, 1, element)
        }
      }
      let element2 = data[index]
      element2 = {
        ...element2,
        editor: false
      }
      data.splice(index, 1, element2)
    }

    this.setState({
      data
    })
  }
  /**
   * 评论提交
   */
  onSubmit1 = (value, index) => {
    console.log(2)
    const { data } = this.state
    let element = ''
    element = {
      plz: `杨辉`,
      content: value
    }
    if (data[index].comment) {
      data[index].comment.splice(index, 0, element)
    } else {
      let temp = data[index]
      temp = {
        ...temp,
        comment: []
      }
      data.splice(index, 1, temp)
      data[index].comment.splice(index + 1, 0, element)
    }
    this.setState({
      data
    })
    this.resetEditor()
  }
  /**
   * 评论回复提交
   */
  onSubmit2 = (value, index, i) => {
    console.log(3)
    const { data } = this.state
    let arr = data[index].comment
    let element = {
      plz: `杨辉`,
      bplz: arr[i].plz,
      content: value
    }
    arr.splice(arr.length, 0, element)
    this.setState({
      data
    })
    this.resetEditor()
  }
  render() {
    return (
      <>
        <Col span={8}>
          <YSelect
            url='/Zzjg/dept/person$m=query'
            params={{
              'size': 100,
              'product_id': '5101040002',
              'id': '8667',
              'mc': '',
              'page': 1
            }} style={{ width: '100%' }}
            searchKey='xingming'
            showArrow mode='multiple'
            // dataSource={[{ id: '01', xingming: '哈哈' }, { id: '02', xingming: '嘿嘿' }]}
            nameKey='xingming'
            valueKey='id'
          />
        </Col>
        <Card title='卡片标题' hoverable loading>卡片内容</Card>
        {
          this.state.data.map((item, index) => <>
            <YComment plz={item.plz} content={item.content} key={index} reply={() => {
              this.reply(index)
            }}
            >
              {
                item.comment ? item.comment.map((e, i) => <>
                  <YComment plz={e.plz} bplz={e.bplz} content={e.content} reply={() => this.commentReply(index, i)} key={`comment${i}`}>
                    {
                      e.editor && <YComment key={`editor${index}`} editor onSubmit={(value) => { this.onSubmit2(value, index, i) }} />
                    }
                  </YComment></>) : ''
              }
              {
                item.editor && <YComment key={`editor${index}`} editor onSubmit={(value) => this.onSubmit1(value, index)} />
              }
            </YComment></>)
        }
      </>
    )
  }

  handleAddItem() {
    this.setState((prevState) => {
      return {
        list: [...prevState.list, 'item']
      }
    })
  }
}

export default demo
