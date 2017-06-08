// MemberRow
import React from 'react';
import { Row, Col, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap'
import './style.css';

const MemberRow = (props) => {
  let memberStyle;
  props.new
    ? memberStyle = 'new-member-style'
    : memberStyle = '';
  return (
    <Row className={memberStyle}>
      <p>
        {/* {_id} */}
        {/* {memberRowId} */}
      </p>
      <Col sm={4} md={2}>
        <FormGroup controlId='firstName'>
          <FormControl
            key={'firstName'}
            type='text'
            name='firstName'
            value={props.firstName}
            onChange={(event) => props.update(event.target.name, event.target.value)}
          />
        </FormGroup>
      </Col>
      <Col sm={4} md={2}>
        <FormGroup controlId='lastName'>
          <FormControl
            key={'lastName'}
            type='text'
            name='lastName'
            value={props.lastName}
            onChange={(event) => props.update(event.target.name, event.target.value)}
          />
        </FormGroup>
      </Col>
      <Col sm={4} md={4}>
        <FormGroup controlId='picture'>
          <FormControl
            key={'picture'}
            type='text'
            name='picture'
            value={props.picture}
            onChange={(event) => props.update(event.target.name, event.target.value)}
          />
        </FormGroup>
      </Col>
      <Col sm={4} md={3}>
        <FormGroup controlId='role'>
          <FormControl
            key={'role'}
            type='text'
            name='role'
            value={props.role}
            onChange={(event) => props.update(event.target.name, event.target.value)}
          />
        </FormGroup>
      </Col>
      <Col sm={4} md={1}>
        <FormGroup controlId='indexNum'>
          <FormControl
            key={'indexNum'}
            type='text'
            name='indexNum'
            value={props.indexNum}
            onChange={(event) => props.update(event.target.name, event.target.value)}
          />
        </FormGroup>
      </Col>
    </Row>
  )
}

export default MemberRow;
