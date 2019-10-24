import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import PreventClickOnDrag from '../interaction/PreventClickOnDrag'
import interact from 'interactjs'
import { _get } from '../utility/generic'
import { GroupRowConsumer } from './GroupRowContext'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import { RowConsumer } from './RowContext'

class GroupRow extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onContextMenu: PropTypes.func.isRequired,
    isEvenRow: PropTypes.bool.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    groupHeight: PropTypes.number.isRequired,
    clickTolerance: PropTypes.number.isRequired,
    group: PropTypes.object.isRequired,
    horizontalLineClassNamesForGroup: PropTypes.func,
    keys: PropTypes.object
  }

  ref = React.createRef()

  componentDidMount() {
    interact(this.ref.current).dropzone({
      accept: '.rct-item',
      overlap: 'pointer'
    })
  }

  handleContextMenu = (e) => {
    this.props.onContextMenu(e, this.props.groupIndex)
  }

  handleDoubleClick = (e) => {
    this.props.onDoubleClick(e, this.props.groupIndex)
  }


  render() {
    const {
      onContextMenu,
      onDoubleClick,
      isEvenRow,
      onClick,
      clickTolerance,
      horizontalLineClassNamesForGroup,
      group,
      children,
      keys,
      canvasWidth,
      groupHeight,
      groupIndex
    } = this.props
    let classNamesForGroup = []
    if (horizontalLineClassNamesForGroup) {
      classNamesForGroup = horizontalLineClassNamesForGroup(group)
    }

    return (
      <PreventClickOnDrag clickTolerance={clickTolerance} groupIndex={groupIndex} onClick={onClick}>
        <div
          ref={this.ref}
          onContextMenu={this.handleContextMenu}
          onDoubleClick={this.handleDoubleClick}
          className={
            'rct-hl ' +
            (isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') +
            (classNamesForGroup ? classNamesForGroup.join(' ') : '')
          }
          style={{
            width: canvasWidth,
            height: groupHeight,
            background: 'lightgray',
            border: '1px solid blue',
            position: 'relative'
          }}
          data-groupid={_get(group, keys.groupIdKey)}
        >
          {children}
        </div>
      </PreventClickOnDrag>
    )
  }
}

class GroupRowWrapper extends PureComponent {
  render() {
    return (
      <TimelineStateConsumer>
        {({ getTimelineState }) => {
          const { canvasWidth, keys } = getTimelineState()
          return (
            <GroupRowConsumer>
              {props => (
                <RowConsumer>
                  {({groupIndex, groupDimensions, groupHeight}) => {
                    return (
                      <GroupRow
                        canvasWidth={canvasWidth}
                        keys={keys}
                        canvasWidth={canvasWidth}
                        isEvenRow={groupIndex % 2 === 0}
                        group={groupDimensions.group}
                        groupHeight={groupHeight}
                        groupIndex={groupIndex}
                        {...props}
                        children={this.props.children}
                      />
                    )
                  }}
                </RowConsumer>
              )}
            </GroupRowConsumer>
          )
        }}
      </TimelineStateConsumer>
    )
  }
}

export default GroupRowWrapper
