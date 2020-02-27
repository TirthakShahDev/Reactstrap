import { combineReducers } from 'redux';
import { AuthenticationReducer } from './AuthenticationReducer';
import { ErrorLogReducer } from './ErrorLogReducer';
import { UtilityReducer } from './UtilityReducer';

export const reducers = combineReducers({
    authentication: AuthenticationReducer,
    errorLog: ErrorLogReducer,
    utility: UtilityReducer,
});
