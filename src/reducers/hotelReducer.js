import { ADD_ROOMS, ADD_TABLES, ADD_MEALS } from '../actions/types';
import { omit, mapKeys } from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_ROOMS:
      return { ...state, payload: action.payload }; // mapKeys take array of data and make object with id's of the data as keys
    case ADD_TABLES:
      return { ...state, payload: action.payload }; // mapKeys take array of data and make object with id's of the data as keys
    case ADD_MEALS:
      return { ...state, payload: action.payload }; // mapKeys take array of data and make object with id's of the data as keys
    default:
      return state;
  }
};