import React from 'react'
import TimelineStateContext from '../timeline/TimelineStateContext'
import { _get, _length } from '../utility/generic'
import { ItemsContextProvider } from '../items/ItemsContext'
import { GroupRowContextProvider } from './GroupRowContext'
import { LayerContextProvider, LayerConsumer } from './LayerContext'
import { RowContextProvider } from './RowContext'

class Rows extends React.PureComponent {
  initState = {
    dragging: false,
    resizing: false,
    dragOffset: 0,
    interactingItemId: undefined
  }

  state = this.initState

  handleDragStart = (dragging, dragOffset, itemId) => {
    this.setState({
      dragging,
      dragOffset,
      interactingItemId: itemId
    })
  }

  clearState = () => {
    this.setState(this.initState)
  }

  handleResizeEnd = (itemId, resizeTime, resizeEdge, timeDelta) => {
    this.props.itemResized(itemId, resizeTime, resizeEdge, timeDelta)
    this.clearState()
  }

  handleDragEnd = () => {
    this.clearState()
  }

  handleResizeStart = (resizing, itemId) => {
    this.setState({
      resizing,
      interactingItemId: itemId
    })
  }

  getLayerRootProps = () => {
    return {
      style: {
        // height: '100%'
      }
    }
  }

  render() {
    const {
      groupHeights,
      groups,
      itemRenderer,
      canChangeGroup,
      canMove,
      canResize,
      canSelect,
      useResizeHandle,
      dragSnap,
      minResizeWidth,
      itemResizing,
      moveResizeValidator,
      itemDrag,
      itemDrop,
      onItemDoubleClick,
      onItemContextMenu,
      itemSelect,
      scrollRef,
      selected,
      selectedItem,
      verticalLineClassNamesForTime,
      timeSteps,
      minUnit,
      rowRenderer: Layers,
      rowData,
      groupsWithItemsDimensions,
      //row props
      clickTolerance,
      onRowClick,
      onRowDoubleClick,
      horizontalLineClassNamesForGroup,
      onRowContextClick,
      items,
      keys,
      resizeEdge
    } = this.props
    return (
      <GroupRowContextProvider
        clickTolerance={clickTolerance}
        onContextMenu={onRowContextClick}
        onClick={onRowClick}
        onDoubleClick={onRowDoubleClick}
        horizontalLineClassNamesForGroup={horizontalLineClassNamesForGroup}
      >
        <ItemsContextProvider
          dragSnap={dragSnap}
          minResizeWidth={minResizeWidth}
          selectedItem={selectedItem}
          canChangeGroup={canChangeGroup}
          canMove={canMove}
          canResize={canResize}
          canSelect={canSelect}
          moveResizeValidator={moveResizeValidator}
          itemSelect={itemSelect}
          itemDrag={itemDrag}
          itemDrop={itemDrop}
          itemResizing={itemResizing}
          onItemDoubleClick={onItemDoubleClick}
          onItemContextMenu={onItemContextMenu}
          itemRenderer={itemRenderer}
          selected={selected}
          useResizeHandle={useResizeHandle}
          scrollRef={scrollRef}
          resizeEdge={resizeEdge}
          itemResized={this.handleResizeEnd}
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
          onResizeStart={this.handleResizeStart}
          dragging={this.state.dragging}
          resizing={this.state.resizing}
          dragOffset={this.state.dragOffset}
          interactingItemId={this.state.interactingItemId}
        >
          <LayerContextProvider
            itemsWithInteractions={items}
            getLayerRootProps={this.getLayerRootProps}
          >
            <div style={{ position: 'absolute', top: 0 }}>
              {groupHeights.map((groupHeight, i) => {
                const groupId = _get(groups[i], keys.groupIdKey)
                const group = groupsWithItemsDimensions[groupId]
                return (
                  <RowContextProvider
                    key={`horizontal-line-${groupId}`}
                    items={group.items || []}
                    groupDimensions={group}
                    groupHeight={groupHeight}
                    groupIndex={i}
                  >
                    <Group Layers={Layers} rowData={rowData} group={group} />
                  </RowContextProvider>
                )
              })}
            </div>
          </LayerContextProvider>
        </ItemsContextProvider>
      </GroupRowContextProvider>
    )
  }
}

class Group extends React.PureComponent {
  render() {
    const { group, Layers, rowData } = this.props

    return (
      <LayerConsumer>
        {({ itemsWithInteractions, getLayerRootProps }) => (
          <Layers
            getLayerRootProps={getLayerRootProps}
            rowData={rowData}
            group={group.group}
            itemsWithInteractions={itemsWithInteractions}
          />
        )}
      </LayerConsumer>
    )
  }
}

export default Rows
