import React, { Component } from 'react'
import { Tag } from 'antd'
import './style.css'
const { CheckableTag } = Tag

export class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTag: []
    }
  }
  componentDidMount() {
    this.props.dataSource.map((item, index) => {
      if (this.props.checked) {
        if (item.bm === this.props.checked) {
          this.setSelectedTag(this.props.checked)
        }
      }
    })
  }
  setSelectedTag = async (value) => {
    console.log('value======', value)
    if (this.props.single) {
      this.setState({
        selectedTag: [value]
      })
    } else {
      const { selectedTag } = this.state
      this.setState({
        selectedTag: [...selectedTag, value]
      })
    }
  }
  handleChange = async (checked, item) => {
    if (checked) {
      await this.setSelectedTag(item.bm)
    } else {
      if (this.props.single) {
        await this.setState({
          selectedTag: []
        })
      } else {
        await this.setState({
          selectedTag: this.state.selectedTag.filter(v => v !== item.bm)
        })
      }
    }
    this.props.onChange(this.state.selectedTag)
  }
  render() {
    const { selectedTag } = this.state
    return (
      <>
        {
          this.props.dataSource.map((item, index) =>
            <CheckableTag
              key={index}
              className={selectedTag.indexOf(item.bm) > -1 ? 'checked' : 'noChecked'}
              checked={selectedTag.indexOf(item.bm) > -1}
              onChange={checked => this.handleChange(checked, item)}
            >
              {item.mc}
            </CheckableTag>
          )
        }

      </>
    )
  }
}

export default index
