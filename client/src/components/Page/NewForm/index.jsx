// NewForm
import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Grid, Col, FormControl, Button } from 'react-bootstrap';
import * as actionCreators from '../../../store/actions';
import * as selectors from '../../../store/selectors';
import MemberRow from './MemberRow';
import * as ku from '../../../lib/ke-utils';

// const NewForm = ({ updateMember, member, requestCreateMember, requestUpdateMember }) => {
class NewForm extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.requestReadMembers();
  }

  render() {
    const { updateMember, member, readMembersRequest, requestCreateMember, requestUpdateMember, requestDeleteMember } = this.props;
    console.log('props', this.props);

    const updateLocalMember = (eventName, eventValue) => {
      ku.log('eventName', eventName, 'green');
      switch (eventName) {
        case ('firstName'):
          updateMember(member._id, eventValue, member.lastName, member.role, member.picture)
          break;
        case ('lastName'):
          updateMember(member._id, member.firstName, eventValue, member.role, member.picture)
          break;
        case ('role'):
          updateMember(member._id, member.firstName, member.lastName, eventValue, member.picture)
          break;
        case ('picture'):
          updateMember(member._id, member.firstName, member.lastName, member.role, eventValue)
          break;
      }
    }

    const createNewMember = () => {

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
          onClick={() => requestUpdateMember(member._id, member)}
        >
          Save
        </Button>
        <Button
          onClick={() => requestDeleteMember(member._id, member)}
        >
          Cancel
        </Button>
        {/*member._id
          ? <h1>true</h1>
          : <h1>false</h1>
        */}

        <form>
          <Grid>
            <Col sm={4} md={2}>First Name</Col>
            <Col sm={4} md={2}>Last Name</Col>
            <Col sm={4} md={4}>Picture</Col>
            <Col sm={4} md={3}>Role</Col>
            <Col sm={4} md={1}>Index</Col>
            {this.props.members.sort((a, b) => a.index - b.index).map((m) => (
              <MemberRow
                key={m.id}
                firstName={m.firstName}
                lastName={m.lastName}
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
  let newMemberId = selectors.getNewMemberId(state);
  let tmpMember;
  newMemberId = newMemberId === null
  ? tmpMember = 'empty'
  : tmpMember = selectors.getMember(state, newMemberId);
  const o = {
    member: tmpMember,
    readMembersRequest: selectors.getRequest(state, 'readMembers'),
    members: selectors.getMembers(state),
  }
  return o;
};

export default connect(mapStateToProps, actionCreators)(NewForm);
