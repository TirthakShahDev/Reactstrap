import { IAppAction, ActionType } from './../actions/Helpers';
import { ErrorLog } from '../state/ErrorLog';

export const ErrorLogReducer = (state: ErrorLog = null, action: IAppAction): ErrorLog => {
    switch (action.type) {
        case ActionType.ERROR_LOG:
            debugger;
            return { ...state, errors : state.errors.concat(action.payload)};
        default:
            return state;
    }
};
