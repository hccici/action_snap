import React, { useState, useCallback } from 'react';
function ClickOpen(props) {
  const name = window.actionSnapConfig.title
  const {data,index} = props
  return (
    <div id={`action_snap_box_${index}`}>
    </div> 
  )
}
export default ClickOpen