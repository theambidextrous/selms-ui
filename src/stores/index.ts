import { combineReducers } from 'redux';
import { authReducer, userReducer } from './user';
import { translationReducer } from './translation';


const combinedReducers = combineReducers({
    user: userReducer,
    auth: authReducer,
    translation: translationReducer,
});

export default combinedReducers;