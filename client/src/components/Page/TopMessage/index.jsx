import React from 'react'
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import * as selectors from '../../../store/selectors';
import * as ku from '../../../lib/ke-utils'
const TopMessage = ({ message }) => {

  if (typeof message === 'object') {
    // ku.log('message is an object', '', 'blue')
  } else {
    // ku.log('message is NOT an object', '', 'blue')
  }
  // ku.log('TopMessage: message', message, 'blue');
  // ku.log('TopMessage: message.value', message.value, 'blue');
  return (
    <h1>message:={message.value}</h1>
  )
}
const mapStateToProps = (state) => {
  return {
    message: selectors.getTopMessage(state),
  }
}

export default connect(mapStateToProps, actionCreators)(TopMessage)
