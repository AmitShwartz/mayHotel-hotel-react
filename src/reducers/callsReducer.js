import { FATCH_CALLS, HANDLE_CALL, DELETE_CALL } from '../actions/types';
import { omit, mapKeys } from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case FATCH_CALLS:
      return { ...state, ...mapKeys(action.payload, 'id') }; // mapKeys take array of data and make object with id's of the data as keys
    case HANDLE_CALL:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_CALL:
      return omit(state, action.payload); // omit removing the object by key and creating new array
    default:
      return state;
  }
};