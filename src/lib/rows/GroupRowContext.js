import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import memoize from 'memoize-one'

const defaultContextState = {
  clickTolerance: undefined,
  onContextMenu: undefined,
  onClick: undefined,
  onDoubleClick: undefined,
  horizontalLineClassNamesForGroup: undefined
}

const GroupRowContext = React.createContext(defaultContextState)

const { Consumer, Provider } = GroupRowContext

export class GroupRowContextProvider extends PureComponent {
  static propTypes = {
    clickTolerance: PropTypes.number.isRequired,
    onContextMenu: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    horizontalLineClassNamesForGroup: PropTypes.func
  }

  getValue = memoize(
    (
      clickTolerance,
      onContextMenu,
      onClick,
      onDoubleClick,
      horizontalLineClassNamesForGroup
    ) => {
      console.log("getValue GroupRowContextProvider")
      return {
        clickTolerance,
        onContextMenu,
        onClick,
        onDoubleClick,
        horizontalLineClassNamesForGroup
      }
    }
  )

  render() {
    const {
      children,
      clickTolerance,
      onContextMenu,
      onClick,
      onDoubleClick,
      horizontalLineClassNamesForGroup
    } = this.props

    return (
      <Provider
        value={this.getValue(
          clickTolerance,
          onContextMenu,
          onClick,
          onDoubleClick,
          horizontalLineClassNamesForGroup
        )}
      >
        {children}
      </Provider>
    )
  }
}

export const GroupRowConsumer = Consumer
export default GroupRowContext
