import { FETCH_SPA, ADD_THEREPIST } from '../actions/types';
import { omit, mapKeys } from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_THEREPIST:
      return { ...state, payload: action.payload }; // mapKeys take array of data and make object with id's of the data as keys
    case FETCH_SPA:
      return { state, ...mapKeys(action.payload, '_id') }; // mapKeys take array of data and make object with id's of the data as keys
    default:
      return state;
  }
};