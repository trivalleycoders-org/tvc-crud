import api from '../api';
import * as ku from '../lib/ke-utils'

/*
    payload must always be an object. If you are passing in a string you must put it in an object: e.g., payload: { value }. If the parameter(s) pass in are already an object then do: e.g., payload: objectName.
 */

export const updateShowManageMembers = (value) => {
  // Calls the showManageMembers reducer
  ku.log('actions.updateShowManageMembers: value', value, 'green');
  return {
  // value will be true / false
  type: 'app/updateShowManageMembers',
  payload: { value },
  }
};

export const replaceMembers = (members) => ({
  type: 'app/replaceMembers',
  payload: members,
});

export const updateNewMemberId = (value) => {
  // ku.log('actions.updateNewMemberId: value', value, 'green');
  return {
    type: 'app/updateNewMemberId',
    payload: { value },
  }
};

export const insertMember = (member) => {
  // ku.log('actions.insertMember: member', member, 'green')
  return {
    type: 'app/insertMember',
    payload: member,
  }
};

export const updateMemberFormFields = ( _id, firstName, lastName, role, picture, index, formSort) => {
  ku.log('actions.updateMember', `${_id}, ${firstName}, ${lastName}, ${role}, ${picture}, ${index}, ${formSort}`, 'green')
  return {
    type: 'app/updateMemberFormFields',
    payload: {
      _id,
      firstName,
      lastName,
      role,
      picture,
      index,
      formSort,
    }
  }
}

export const updateMember = ( _id, firstName, lastName, role, picture, index ) => {
  ku.log('actions.updateMember', `${_id}, ${firstName}, ${lastName}, ${role}, ${picture}, ${index}`, 'green')
  // property 'formSort' will be set to the value of 'index'
  return {
    type: 'app/updateMember',
    payload: {
      _id,
      firstName,
      lastName,
      role,
      picture,
      index,
      formSort: index,
    }
  }
}

export const removeMember = (_id) => ({
  type: 'app/removeMember',
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
  success: [ insertMember, (member) => updateNewMemberId(member._id) ],
});

export const requestUpdateMember = createRequestThunk({
  request: api.members.update,
  key: (_id) => `updateMember/${_id}`,
  success: [ updateNewMemberId('none') ],
  failure: [ ]
})

export const requestDeleteMember = createRequestThunk({
  request: api.members.delete,
  key: (_id) => `deleteMember/${_id}`,
  success: [ (member) => removeMember(member._id), updateNewMemberId('none') ],
  // failure:
})
