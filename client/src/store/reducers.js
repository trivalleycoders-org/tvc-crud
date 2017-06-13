import { combineReducers } from 'redux';
// import { merge, prepend, dissoc, without } from 'ramda';
import { merge, prepend, dissoc, without } from 'ramda';
import * as ku from '../lib/ke-utils';


export const membersById = ( state = {}, { type, payload }) => {
  try {
    switch (type) {
      case 'app/updateMemberFormFields':
      case 'app/updateMember':
      case 'app/insertMember': // new/add & update
        return merge(state, { [payload._id]: payload });
      case 'app/replaceMembers': // read list load all
        return payload.members;
      case 'app/removeMember':
        // ku.log('reducers.membersById: state', state, 'orange')
        // ku.log('reducers.membersById: payload', payload, 'orange')
        const d = dissoc(payload._id, state);
        // ku.log('reducers.membersById: state', state, 'orange')
        return d;
      default:
        return state;
    }
  } catch (e) {
    // ku.log('reducers.membersById', e, 'red');
  }

}

export const membersIds = (state = [], { type, payload }) => {
  try {
    switch (type) {
      case 'app/replaceMembers':
        // ku.log('membersIds.payload', payload, 'orange');
        return payload.ids;
      case 'app/insertMember':
        return prepend(payload._id, state);
      case 'app/removeMember':
        return without(payload._id, state);
      default:
        return state;
    }
  } catch (e) {
    // ku.log('reducers.membersById', e, 'red');
  }

};

export const requests = (state = {}, { type, payload, meta }) => {
  switch (type) {
    case 'app/markRequestPending':
      return merge(state, { [meta.key]: { status: 'pending', error: null } });
    case 'app/markRequestSuccess':
      return merge(state, { [meta.key]: { status: 'success', error: null } });
    case 'app/markRequestFailed':
      return merge(state, { [meta.key]: { status: 'failure', error: payload } });
    default:
      return state;
  }
};

// ui: reducers
export const updateNewMemberId = (state = 'not-set', { type, payload }) => {
  switch (type) {
    case 'app/updateNewMemberId':
      // ku.log('reducers.newMemberId.payload', payload, 'orange');
      return payload.value;
    default:
      return state;
  }
};

export const showManageMembers = (state = { value: false }, { type, payload }) => {

  switch (type) {
    case 'app/updateShowManageMembers':
      // ku.log('reducers.updateShowManageMembers: payload', payload, 'orange');
      return payload;
    default:
      return state;
  }
};

export const topMessage = (state = { value: '' }, { type, payload }) => {
  switch (type) {
    case 'app/updateTopMessage':
      // ku.log('reducers.updateTopMessage: payload.message', payload.message, 'orange');
      return payload;
    default:
      return state;
  }
};

export default combineReducers({
  members: combineReducers({
    membersById,
    membersIds,
  }),
  ui: combineReducers({
    updateNewMemberId,
    showManageMembers,
    topMessage,
  }),
  requests,
})
