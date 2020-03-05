import { combineReducers } from 'redux';
import { AuthenticationReducer } from './AuthenticationReducer';
import { ErrorLogReducer } from './ErrorLogReducer';

export const reducers = combineReducers({
    UserData: AuthenticationReducer,
    errorLog: ErrorLogReducer
});
