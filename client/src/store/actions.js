import api from '../api';
import * as ku from '../lib/ke-utils'

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
  ku.log('actions.updatemember: _id', _id, 'green');
  ku.log('actions.updatemember: firstName', firstName, 'green');
  ku.log('actions.updatemember: lastName', lastName, 'green');
  ku.log('actions.updatemember: role', role, 'green');
  ku.log('actions.updatemember: picture', picture, 'green');
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
  success: [ updateMember ]
})
