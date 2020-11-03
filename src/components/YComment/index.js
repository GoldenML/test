import React, { Component } from 'react'
import { Comment, Avatar, Form, Input, Button } from 'antd'
const { TextArea } = Input
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType='submit' loading={submitting} onClick={onSubmit} type='primary'>
        Add Comment
      </Button>
    </Form.Item>
  </>
)
export class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      replyStatus: false
    }
  }
  reply = () => {
    this.props.reply()
  }
  onSubmit = () => {
    console.log(this.state.value)
    const { value } = this.state
    const { onSubmit } = this.props
    if (onSubmit) {
      onSubmit(value)
    }
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  render() {
    const { children, editor, headPhoto, plz, content, bplz } = this.props
    return (
      <>
        <Comment actions={[<span onClick={this.reply} key='comment-nested-reply-to'>{editor ? '' : '回复'}</span>]}
          author={<a>{plz ? bplz ? `${plz} 回复了 ${bplz}` : plz : '洪玄玄'}</a>}
          avatar={
            <Avatar
              src={headPhoto || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
              alt={plz ? bplz ? `${plz} 回复了 ${bplz}` : plz : '洪玄玄'}
            />
          }
          content={
            editor ? <Editor onChange={this.onChange} onSubmit={this.onSubmit} />
              : <p>
                {content || '我是傻子'}
              </p>

          }
        >
          {children}
        </Comment>
      </>
    )
  }
}

export default index
