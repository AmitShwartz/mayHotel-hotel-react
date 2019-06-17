import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import callsReducer from './callsReducer';
import eventsReducer from './eventsReducer';
import reservationsReducer from './reservationsReducer';
import spaReducer from './spaReducer';
import hotelReducer from './hotelReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    calls: callsReducer,
    events: eventsReducer,
    reservations: reservationsReducer,
    spa: spaReducer,
    hotel: hotelReducer
})