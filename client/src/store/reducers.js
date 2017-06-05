import { combineReducers } from 'redux';
// import { dissoc } from 'ramda';
import { merge, prepend, mergeAll } from 'ramda';
import * as ku from '../lib/ke-utils';

export const membersById = ( state = {}, { type, payload }) => {
  switch (type) {
    case 'app/updateMember':
      ku.log('reducers.membersById: type', type, 'green');
      ku.log('reducers.membersById: payload', payload, 'green');
      ku.log('reducers.membersById: state', state, 'green')
      const p = merge(state, { [payload._id]: payload });
      // const p = mergeAll(state, payload);
      ku.log('reducers.membersById: p', p, 'green');
      return p;
    case 'app/insertMember': // new/add
      // ku.log('reducers.membersById: type', type, 'green');
      // ku.log('reducers.membersById: payload', payload, 'green');
      const o = merge(state, { [payload._id]: payload });
      // ku.log('reducers.membersById: o', o, 'green');
      return o;
    case 'app/replaceMembers': // read list load all
      return payload.members;
    default:
      return state;
  }
}

export const membersIds = (state = [], { type, payload }) => {
  switch (type) {
    // case 'app/updateMember':
    case 'app/insertMember':
      // ku.log('reducers.membersIds: payload', payload, 'green');
      const o = prepend(payload._id, state);
      // ku.log('reducers.membersIds: o', o, 'green');
      return o;
    case 'app/replaceMembers':
      return payload.ids;
    default:
      return state;
  }
};

export const newMemberId = (state = null, { type, payload }) => {
  switch (type) {
    case 'app/newMemberId':
      /*ku.log('newMemberId.type', type, 'green')
      ku.log('newMemberId.payload', payload, 'green')
      ku.log('payload._id', payload._id, 'green')*/
      return payload._id;
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
  }),
  requests,
})
