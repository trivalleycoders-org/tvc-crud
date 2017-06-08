// NewForm
import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Grid, Col, FormControl, Button } from 'react-bootstrap';
import * as actionCreators from '../../../store/actions';
import * as selectors from '../../../store/selectors';
import MemberRow from './MemberRow';
import * as ku from '../../../lib/ke-utils';

class NewForm extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.requestReadMembers();
  }

  render() {
    const { updateMember, newMember, newMemberId2, readMembersRequest, requestCreateMember, requestUpdateMember, requestDeleteMember, newMemberId, updateShowManageMembers } = this.props;

    const updateLocalMember = (eventName, eventValue) => {
      ku.log('eventName:eventValue', `${eventName}:${eventValue}` , 'green');
      switch (eventName) {
        case ('firstName'):
          updateMember(newMember._id, eventValue, newMember.lastName, newMember.role, newMember.picture, newMember.index)
          break;
        case ('lastName'):
          updateMember(newMember._id, newMember.firstName, eventValue, newMember.role, newMember.picture, newMember.index)
          break;
        case ('role'):
          updateMember(newMember._id, newMember.firstName, newMember.lastName, eventValue, newMember.picture, newMember.index)
          break;
        case ('picture'):
          updateMember(newMember._id, newMember.firstName, newMember.lastName, newMember.role, eventValue, newMember.index)
          break;
          case ('index'):
            updateMember(newMember._id, newMember.firstName, newMember.lastName, newMember.role, newMember.picture, eventValue)
            break;
      }
    }

    return (
      <div>
        <h2>Manage Users</h2>
        <Button
          onClick={requestCreateMember}
        >
          New Member
        </Button>
        <Button
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
          onClick={() => updateShowManageMembers('no-show')}
        >
          Close
        </Button>
        <form>
          <Grid>
            <Col sm={4} md={2}>First Name</Col>
            <Col sm={4} md={2}>Last Name</Col>
            <Col sm={4} md={4}>Picture</Col>
            <Col sm={4} md={3}>Role</Col>
            <Col sm={4} md={1}>Index</Col>
            {this.props.members.sort((a, b) => a.index - b.index).map((m) => (
              <MemberRow
                key={m._id}
                _id={m._id}
                firstName={m.firstName}
                lastName={m.lastName}
                new={m._id === newMemberId}
                role={m.role}
                picture={m.picture}
                index={m.index}
                update={updateLocalMember}
              />
            ))}
          </Grid>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let newMember;
  let newMemberId = selectors.getNewMemberId(state);
  newMemberId === 'none'
    ? newMember = {}
    : newMember = selectors.getMember(state, newMemberId)
  const o = {
    newMemberId,
    newMember,
    readMembersRequest: selectors.getRequest(state, 'readMembers'),
    members: selectors.getMembers(state),
  }
  return o;
};

export default connect(mapStateToProps, actionCreators)(NewForm);
