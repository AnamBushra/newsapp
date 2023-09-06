import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'
export class Loading extends Component {
  render() {
    return (
      <div>
         <Spinner animation="border" variant="primary" />
      </div>
    )
  }
}

export default Loading
