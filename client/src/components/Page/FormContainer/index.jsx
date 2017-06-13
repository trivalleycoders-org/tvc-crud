// FormContainer
import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import * as actionCreators from '../../../store/actions';
import * as selectors from '../../../store/selectors';
import FormChild from './FormChild';
import * as ku from '../../../lib/ke-utils';

class NewForm extends Component {

  componentWillMount() {
    this.props.requestReadMembers();
  }


  render() {
    const { updateMember, newMember, readMembersRequest, requestCreateMember, requestUpdateMember, requestDeleteMember, newMemberId, updateShowManageMembers, updateMemberFormFields } = this.props;

    const createNew = () => {
      // ku.log('createNew', 'createNew', 'blue');
      requestCreateMember()

    }

    const updateField = (fieldName, fieldValue) => {
      // ku.log('FormContainer.updateField: eventName:fieldValue', `${fieldName}:${fieldValue}` , 'blue');

      const valId = newMember._id;
      const valFirstName = fieldName === 'firstName'
        ? fieldValue
        : newMember.firstName;
      const valLastName = fieldName === 'lastName'
        ? fieldValue
        : newMember.lastName;
      const valRole = fieldName === 'role'
        ? fieldValue
        : newMember.role;
      const valPicture = fieldName === 'picture'
        ? fieldValue
        : newMember.picture;
      const valIndex = fieldName === 'index'
        ? fieldValue
        : newMember.index;
      const valFormSort = newMember.formSort;
      // ku.log('update values: ', `${valId}, ${valFirstName}, ${valLastName}, ${valRole}, ${valPicture}, ${valIndex}`, 'blue')
      updateMemberFormFields(valId, valFirstName, valLastName, valRole, valPicture, valIndex, valFormSort)
    }

    const cancel = () => {
      requestDeleteMember(newMember._id, newMember)
    }

    // ku.log('FormContainer.render.return: newMemberId', newMemberId, 'blue')

    return (
      <FormChild
        createNew={createNew}
        newMemberId={newMemberId}
        cancel={cancel}
        updateField={updateField}
        members={this.props.members}

      />
    )
  }
}

const mapStateToProps = (state) => {
  let newMember;
  let newMemberId = selectors.getNewMemberId(state);
  newMember = selectors.getMember(state, newMemberId);
  const o = {
    newMemberId,
    newMember,
    readMembersRequest: selectors.getRequest(state, 'readMembers'),
    members: selectors.getMembers(state),
  }
  return o;
};

export default connect(mapStateToProps, actionCreators)(NewForm);
