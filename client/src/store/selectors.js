import * as ku from '../lib/ke-utils';

export const getMembers = (state) =>{
  // ku.log('getMembers.state', state, 'red');
  return state.members.membersIds.map((id) => state.members.membersById[id]);
}

export const getMember = (state, _id) => {
  ku.log('selectors.getMember: state', state, 'red');
  ku.log('selectors.getmember: _id', _id, 'red');
  const o = state.members.membersById[_id] || null;
  ku.log('selectors.getmember: o', o, 'red');
  return o;
}

export const getNewMemberId = (state) => {
  console.log('state', state, 'red');
  return state.ui.newMemberId;
}

// redux selectors
export const getRequest = (state, key) =>
  state.requests[key] || {};

export const getRequests = (state) =>
  state.requests;

export const areRequestsPending = (requests) => {
  return Object.keys(requests)
    .some((key) => requests[key].status === 'pending');
};
