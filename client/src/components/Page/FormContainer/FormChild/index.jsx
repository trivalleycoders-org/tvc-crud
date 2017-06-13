// FormChild

import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import FormRow from './FormRow';
import * as ku from '../../../../lib/ke-utils';

const FormChild = (props) => {
  // ku.log('FormChild: newMemberId', props.newMemberId, 'blue')
  return (
    <div>
      <h2>Manage Users</h2>
      <Button
        onClick={props.createNew}
      >
        New Member
      </Button>
      <Button
        onClick={() => props.cancel(props.newMemberId)}
      >
        Cancel
      </Button>
      {/* <Button
          onClick={() => requestUpdateMember(newMember._id, newMember)}
          >
          Save
          </Button>
          <Button
          onClick={() => requestDeleteMember(newMember._id, newMember)}
          >
          Cancel
          </Button>
        <Button
        onClick={() => updateShowManageMembers(false)}
        >
        Close
      </Button> */}

      <form>
        <Grid>
          <Row>
            <Col sm={4} md={2}>First Name</Col>
            <Col sm={4} md={2}>Last Name</Col>
            <Col sm={4} md={4}>Role</Col>
            <Col sm={4} md={3}>Picture</Col>
            <Col sm={4} md={1}>Index</Col>
          </Row>
          {props.members.sort((a, b) => a.formSort - b.formSort).map((m) => (
            <FormRow
              key={m._id}
              _id={m._id}
              firstName={m.firstName}
              lastName={m.lastName}
              active={m._id === props.newMemberId}
              role={m.role}
              picture={m.picture}
              index={m.index}
              updateField={props.updateField}
            />
          ))}
        </Grid>
      </form>
    </div>
  )
}

export default FormChild;
