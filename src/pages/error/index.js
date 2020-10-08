import React, { Component } from 'react'
import { Result, Button } from 'antd'
import { withRouter } from 'react-router-dom'
class index extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  back = () => {
    this.props.history.push('/home')
  }
  render() {
    return (
      <>
        <Result
          status='404'
          title='404'
          subTitle='Sorry, the page you visited does not exist.'
          extra={<Button type='primary' onClick={this.back}>Back Home</Button>}
        />
      </>
    )
  }
}

export default withRouter(index)
