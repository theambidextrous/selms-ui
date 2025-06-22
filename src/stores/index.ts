import { combineReducers } from 'redux';
import { authReducer, userReducer } from './user';


const combinedReducers = combineReducers({
    user: userReducer,
    auth: authReducer
});

export default combinedReducers;