import React, { Component } from 'react'

import './font.css'
import Style from './style.module.less'

export default class ContentHeader extends Component {
  static defaultProps = {
    stripVisible: true,
    fontWeight: 600
  }
  // eslint-disable-next-line react/state-in-constructor
  state = {
    color: '#4A90E2',
    padding: '20px 30px 10px 20px'
  }
  componentDidMount() {
    this.initPropsState()
  }
  initPropsState = () => {
    if (this.props.color) {
      this.setState({ color: this.props.color })
    }
    if (this.props.padding) {
      this.setState({ padding: this.props.padding })
    }
  }

  render() {
    return (
      <div className={this.props.className ? this.props.className : ''}>
        <div className={this.props.showLine ? Style.contentHeader : Style.contentHeaderNoBorder}
          style={{ padding: this.props.padding }}
        >
          {this.props.stripVisible ? (<div style={{ marginRight: '6px', width: '4px', height: '16px', borderRadius: '1px', backgroundColor: this.state.color, display: 'inline' }}>&nbsp;</div>) : null}
          <span style={{ fontSize: '16px', color: '#333333', fontWeight: this.props.fontWeight, fontFamily: 'PingFangSC-Regular,PingFang SC' }}>{this.props.children}</span>
        </div>
      </div>
    )
  }
}