import { FETCH_RESERVATIONS } from '../actions/types';
import { mapKeys } from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_RESERVATIONS:
      return { state, ...mapKeys(action.payload, '_id') }; // mapKeys take array of data and make object with id's of the data as keys
    default:
      return state;
  }
};