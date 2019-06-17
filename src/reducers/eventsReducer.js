import { CREATE_EVENT, FETCH_EVENTS, DELETE_EVENT } from '../actions/types';
import { omit, mapKeys } from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT:
      return { ...state, payload: action.payload }; // mapKeys take array of data and make object with id's of the data as keys
    case FETCH_EVENTS:
      return { ...state, ...mapKeys(action.payload, '_id') }; // mapKeys take array of data and make object with id's of the data as keys
    case DELETE_EVENT:
        return omit(state, action.payload); // omit removing the object by key and creating new array
      default:
      return state;
  }
};