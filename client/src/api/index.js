import { normalize, Schema, arrayOf } from 'normalizr';
const members = new Schema('members', { idAttribute: '_id' });
import * as ku from '../lib/ke-utils';


export const rejectErrors = (res) => {
  const { status } = res;
  if (status >= 200 && status < 300) {
    return res;
  }
  return Promise.reject({ message: res.statusText });
};

export const fetchJson = (url, options = {}) => (

  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(rejectErrors)
  .then((res) => res.json())//I bet this .json does not need to be here
);

export default {

  members: {
    readList() {
      return fetchJson(
        '/members',
        { method: 'GET' }
      )
        .then((data) => {
          const normalized = normalize(data, arrayOf(members));
          const o = {
            members: normalized.entities.members || {},
            ids: normalized.result,
          };
          return o;
        });
    },
    create() {
      return fetchJson(
        '/members',
        { method: 'POST' }
      );
    },
    update(id, member) {
      ku.log('api.members.update: id', id, 'pink');
      ku.log('api.members.update: member', member, 'pink')
      return fetchJson(
        `/members/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ member }) }
      );
    },
    delete(id) {
      ku.log('api.members.delete: id', id, 'pink');
      return fetchJson(
        `/members/${id}`,
        {
          method: 'DELETE'
        }
      );
    },
  },
};
