// FormRow
import React from 'react';
import { Row, Col, FormControl, FormGroup } from 'react-bootstrap'
import InputField from './InputField'
import './style.css';
// import * as ku from '../../../../lib/ke-utils'

const MemberRow = (props) => {
  let memberStyle;
  props.active
    ? memberStyle = 'new-member-style'
    : memberStyle = '';

  return (
    <form>
      <Row className={memberStyle}>
        <Col sm={4} md={2}>
          <InputField
            key={'firstName'}
            type='text'
            name={'firstName'}
            value={props.firstName}
            validationRule='text'
            updateField={props.updateField}
          />
        </Col>
        <Col sm={4} md={2}>
          <InputField
            key={'lastName'}
            type='text'
            name='lastName'
            value={props.lastName}
            validationRule='text'
            updateField={props.updateField}
          />
        </Col>
        <Col sm={4} md={3}>
          <InputField
            key={'role'}
            type='text'
            name='role'
            value={props.role}
            validationRule='text'
            updateField={props.updateField}
          />
        </Col>
        <Col sm={4} md={4}>
          <InputField
            key={'picture'}
            type='text'
            name='picture'
            validationRule='text'
            value={props.picture}
            updateField={props.updateField}
          />
        </Col>
        <Col sm={4} md={1}>
          <InputField
            key={'index'}
            type='text'
            name='index'
            validationRule='integer'
            value={props.index}
            updateField={props.updateField}
          />
        </Col>
      </Row>
    </form>
  )
}

export default MemberRow;
