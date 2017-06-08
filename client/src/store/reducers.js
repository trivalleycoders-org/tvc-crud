import { combineReducers } from 'redux';
import { merge, prepend, dissoc, without } from 'ramda';
import * as ku from '../lib/ke-utils';

export const membersById = ( state = {}, { type, payload }) => {
  switch (type) {
    case 'app/updateMember':
    case 'app/insertMember': // new/add & update
      return merge(state, { [payload._id]: payload });
    case 'app/replaceMembers': // read list load all
      return payload.members;
    case 'app/removeNote':
      return dissoc(payload._id, state);
    default:
      return state;
  }
}

export const membersIds = (state = [], { type, payload }) => {
  switch (type) {
    case 'app/replaceMembers':
      // ku.log('membersIds.payload', payload, 'green');
      return payload.ids;
    case 'app/insertMember':
      return prepend(payload._id, state);
    case 'app/removeMember':
      return dissoc(payload._id, state);
    default:
      return state;
  }
};

export const newMemberId = (state = null, { type, payload }) => {
  switch (type) {
    case 'app/updateNewMemberId':
      ku.log('reducers.newMemberId.payload', payload, 'red');
      return payload._id;
    default:
      return state;
  }
};

export const showManageMembers = (state = 'no-show', { type, payload }) => {
  ku.log('reducers.showManageMembers: payload', payload, 'green');
  switch (type) {
    case 'app/updateShowManageMembers':

      return payload;
    default:
      return state;
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

export default combineReducers({
  members: combineReducers({
    membersById,
    membersIds,
  }),
  ui: combineReducers({
    newMemberId,
    showManageMembers,
  }),
  requests,
})
