import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';

import * as actionCreators from '../../../store/actions';
import * as selectors from '../../../store/selectors';

class AddMember extends Component {
  render() {
    const { updateMember, member, requestCreateMember, requestUpdateMember, readMembersRequest } = this.props;
    <Button onClick={requestCreateMember}>New Member</Button>
    <Button onClick={() => requestUpdateMember(member._id, member)}>Save    </Button>
    <form>
      <FormControl
        key={'firstName'}
        type="text"
        onChange={(event) => updateMember(event.target.value, member._id)}
        placeholder='First Name'
        value={member.firstName}
      />
      <FormControl
        key={'lastName'}
        type="text"
        onChange={(event) => updateMember(event.target.value, member._id)}
        placeholder='Last Name'
        value={member.lastName}
      />
      <FormControl
        key={'picture'}
        type="text"
        onChange={(event) => updateMember(event.target.value, member._id)}
        placeholder='Picture'
        value={member.picture}
      />
      <FormControl
        key={'role'}
        type="text"
        onChange={(event) => updateMember(event.target.value, member._id)}
        placeholder='Role'
        value={member.role}
      />
    </form>
  }
}

const mapStateToProps = (state) => {
  let newMemberId = selectors.getNewMemberId(state);
  return {
    member: selectors.getMember(state, newMemberId),
    readMembersRequest: selectors.getRequest(state, 'readMembers'),
  }
};

export default connect(mapStateToProps, actionCreators)(AddMember);



// Relavant action
export const updateMember = (_id, firstName, lastName, role, picture ) => ({
  type: 'app/updateMember',
  payload: {
    _id,
    firstName,
    lastName,
    role,
    picture,
  }
})

// Relavant reducer
export const membersById = ( state = {}, { type, payload }) => {
  switch (type) {
    case 'app/updateMember':
      return merge(state, { [payload._id]: payload });;
    case 'app/insertMember': // new/add
      return merge(state, { [payload._id]: payload });;
    case 'app/replaceMembers': // read list load all
      return payload.members;
    default:
      return state;
  }
}
