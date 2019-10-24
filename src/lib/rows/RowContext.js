import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const defaultContextState = {
    items: undefined,
    groupDimensions: undefined,
    groupHeight: undefined,
    groupIndex: undefined,
}

const RowContext = React.createContext(defaultContextState)

const { Consumer, Provider } = RowContext

export class RowContextProvider extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    groupDimensions: PropTypes.object.isRequired,
    groupHeight: PropTypes.number.isRequired,
    groupIndex: PropTypes.number.isRequired,
  }
  render() {
    const { children, ...rest } = this.props
    return <Provider value={rest}>{children}</Provider>
  }
}

export const RowConsumer = Consumer
export default RowContext
