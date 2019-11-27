
// Following is an sample for InfiniteLoader
// Refer to: https://github.com/bvaughn/react-virtualized/blob/master/docs/InfiniteLoader.md#examples


import React from 'react';
import ReactDOM from 'react-dom';
import { InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

// 1. Number of rows to show




// This example assumes you have a way to know/load this information
const remoteRowCount
const list = [];

function isRowLoaded ({ index }) {
  return !!list[index];
}

function loadMoreRows ({ startIndex, stopIndex }) {
  return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
    .then(response => {
      // Store response data in list...
    })
}

function rowRenderer ({ key, index, style}) {
  return (
    <div
      key={key}
      style={style}
    >
      {list[index]}
    </div>
  )
}

// Render your list
ReactDOM.render(
  <InfiniteLoader
    isRowLoaded={isRowLoaded}
    loadMoreRows={loadMoreRows}
    rowCount={remoteRowCount}
  >
    {({ onRowsRendered, registerChild }) => (
      <List
        height={200}
        onRowsRendered={onRowsRendered}
        ref={registerChild}
        rowCount={remoteRowCount}
        rowHeight={20}
        rowRenderer={rowRenderer}
        width={300}
      />
    )}
  </InfiniteLoader>,
  document.getElementById('example')
);

export default 