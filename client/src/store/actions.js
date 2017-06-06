import api from '../api';
import * as ku from '../lib/ke-utils'

export const showManageMemebers = (show) => ({
  type: 'app/showManageMembers',
  payload: { show },
});

export const replaceMembers = (members) => ({
  type: 'app/replaceMembers',
  payload: members,
});

export const newMemberId = (_id) => ({
  type: 'app/newMemberId',
  payload: { _id },
});

export const insertMember = (member) => {
  // ku.log('actions.insertMember: member', member, 'red')
  return {
    type: 'app/insertMember',
    payload: member,
  }
};

export const updateMember = ( _id, firstName, lastName, role, picture ) => {
  // ku.log('_id', _id, 'red');
  // ku.log('firstName', firstName, 'red');
  // ku.log('lastName', lastName, 'red');
  // ku.log('role', role, 'red');
  // ku.log('picture', picture, 'red');
  return {
    type: 'app/updateMember',
    payload: {
      _id,
      firstName,
      lastName,
      role,
      picture,
    }
  }
}

export const removeMember = (_id) => ({
  type: 'app/removeNote',
  payload: { _id },
});

export const markRequestPending = (key) => ({
  type: 'app/markRequestPending',
  meta: { key },
});
/*
    Variations of an actionCreator
 */
// This variation allows you to log
export const markRequestSuccess = (key) => {
  // you can use console.log() here
  return ({
    type: 'app/markRequestSuccess',
    meta: { key },
  });
}
// This variation is shorter but you can't log
/*export const markRequestSuccess = (key) => ({
  type: 'app/markRequestSuccess',
  meta: { key },
});*/

export const markRequestFailed = (reason, key) => ({
  type: 'app/markRequestFailed',
  payload: reason,
  meta: { key },
});

export const createRequestThunk = ({ request, key, start = [], success = [], failure = [] }) => {

  return (...args) => (dispatch) => {
    const requestKey = (typeof key === 'function') ? key(...args) : key;

    start.forEach((actionCreator) => dispatch(actionCreator()));
    dispatch(markRequestPending(requestKey));
    return request(...args)
      .then((data) => {
        success.forEach((actionCreator) => dispatch(actionCreator(data)));
        dispatch(markRequestSuccess(requestKey));
      })
      .catch((reason) => {
        failure.forEach((actionCreator) => dispatch(actionCreator(reason)));
        dispatch(markRequestFailed(reason, requestKey));
      });
  };
};

export const requestReadMembers = createRequestThunk({
  request: api.members.readList,
  key: 'readMembers',
  success: [ replaceMembers ]
});

export const requestCreateMember = createRequestThunk({
  request: api.members.create,
  key: 'createMember',
  success: [ insertMember, (member) => newMemberId(member._id) ],
});

export const requestUpdateMember = createRequestThunk({
  request: api.members.update,
  key: (_id) => `updateMember/${_id}`,
  // success: [ updateMember ]
  // failure:
})

export const requestDeleteMember = createRequestThunk({
  request: api.members.delete,
  key: (_id) => `deleteMember/${_id}`,
  success: [ (member) => removeMember(member._id) ]
  // failure:
})
