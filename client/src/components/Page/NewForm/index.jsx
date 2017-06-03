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
            onChange={(event) => updateMember(event.target.value)}
            placeholder='First Name'
            value={member.firstName}
          />
          <FormControl
            key={'lastName'}
            type="text"
            onChange={(event) => updateMember(event.target.value)}
            placeholder='Last Name'
            value={member.lastName}
          />
          <FormControl
            key={'picture'}
            type="text"
            onChange={(event) => updateMember(event.target.value)}
            placeholder='Picture'
            value={member.picture}
          />
          <FormControl
            key={'role'}
            type="text"
            onChange={(event) => updateMember(event.target.value)}
            placeholder='Role'
            value={member.role}
          />
        </form>
      </div>
    )
  }
}

/*NewForm.propTypes = {
  member: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
  }),
};*/

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
