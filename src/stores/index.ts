import { combineReducers } from 'redux';
import { authReducer, userReducer } from './user';
import { translationReducer } from './translation';
import { statsReducer } from './stats';


const combinedReducers = combineReducers({
    user: userReducer,
    auth: authReducer,
    translation: translationReducer,
    stats: statsReducer
});

export default combinedReducers;