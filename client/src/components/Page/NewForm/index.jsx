// NewForm
import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import * as actionCreators from '../../../store/actions';
import * as selectors from '../../../store/selectors';
// import * as ku from '../../../lib/ke-utils';

// const NewForm = ({ updateMember, member, requestCreateMember, requestUpdateMember }) => {
class NewForm extends Component {
  /*componentWillMount() {
    // this.props.requestReadMembers();
  }*/

  render() {
    const { updateMember, member, requestCreateMember, requestUpdateMember, readMembersRequest } = this.props;

    const updateLocalMember = (propName, propValue) => {
      switch (propName) {
        case ('firstName'):
          updateMember(member._id, propValue, member.lastName, member.role, member.picture)
          break;
        case ('lastName'):
          updateMember(member._id, member.firstName, propValue, member.role, member.picture)
          break;
        case ('role'):
          updateMember(member._id, member.firstName, member.lastName, propValue, member.picture)
          break;
        case ('picture'):
          updateMember(member._id, member.firstName, member.lastName, member.role, propValue)
          break;
      }
    }

    return (
      <div>
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

        {member._id
          ? <h1>true</h1>
          : <h1>false</h1>
        }
        <h1>New Form</h1>
        <form>
          <FormControl
            key={'firstName'}
            type="text"
            onChange={(event) => updateLocalMember('firstName', event.target.value)}
            placeholder='First Name'
            value={member.firstName}
          />
          <FormControl
            key={'lastName'}
            type="text"
            onChange={(event) => updateLocalMember('lastName', event.target.value)}
            placeholder='Last Name'
            value={member.lastName}
          />
          <FormControl
            key={'picture'}
            type="text"
            onChange={(event) => updateLocalMember('picture', event.target.value)}
            placeholder='Picture'
            value={member.picture}
          />
          <FormControl
            key={'role'}
            type="text"
            onChange={(event) => updateLocalMember('role', event.target.value)}
            placeholder='Role'
            value={member.role}
          />
        </form>
      </div>
              )
              }
              }

              const mapStateToProps = (state) => {

  let newMemberId = selectors.getNewMemberId(state);
  let tmpMember;
  // ku.log('newMemberId', newMemberId, 'green');
  newMemberId = newMemberId === null
  ? tmpMember = 'empty'
  : tmpMember = selectors.getMember(state, newMemberId);
  // ku.log('newMemberId=null?', newMemberId, 'green');
  const o = {
    member: tmpMember,
    readMembersRequest: selectors.getRequest(state, 'readMembers'),
    members: selectors.getMembers(state),
  }
  return o;
};

export default connect(mapStateToProps, actionCreators)(NewForm);
