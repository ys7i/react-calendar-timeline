import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AutoSizer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }
  constructor() {
    super()

    this.state = {
      isMounted: false,
      topOffset: 0,
      width: 0
    }
  }
  componentDidMount() {
    const { top, width } = this.measureEl.getBoundingClientRect()

    this.setState({
      isMounted: true,
      top,
      width
    })
  }
  render() {
    const { isMounted, width, top } = this.state

    if (isMounted) {
      return React.cloneElement(this.props.children, {
        initialTopOffset: top,
        initialContainerWidth: width
      })
    }

    return <div ref={el => (this.measureEl = el)} />
  }
}

export default AutoSizer
