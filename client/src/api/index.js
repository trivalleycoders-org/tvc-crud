import { normalize, Schema, arrayOf } from 'normalizr';
const events = new Schema('events', { idAttribute: '_id' });
const projects = new Schema('projects', { idAttribute: '_id' });
const members = new Schema('members', { idAttribute: '_id' });
const techlogos = new Schema('techlogos', { idAttribute: '_id' });
const navButtons = new Schema('navButtons', { idAttribute: '_id' } );
const sponsors = new Schema('sponsors', { idAttribute: '_id' } );
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
  events: {
    readList() {
      return fetchJson('/events')
        .then((data) => {
          const normalized = normalize(data, arrayOf(events));
          const o = {
            events: normalized.entities.events || {},
            ids: normalized.result,
          };
          return o;
        });
    },
  },

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
      console.log('members.update.id', id);
      return fetchJson(
        `/members/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ member }) }
      );
    },

    delete(id) {
      ku.log('api.members.delete: id', id, 'green');
      return fetchJson(
        `/members/${id}`,
        {
          method: 'DELETE'
        }
      );
    },
  },
};
