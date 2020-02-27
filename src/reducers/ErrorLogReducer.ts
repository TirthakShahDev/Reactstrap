import { IAppAction, ActionType } from './../actions/Helpers';
import { ErrorLog } from '../state/ErrorLog';

export const ErrorLogReducer = (state: ErrorLog = null, action: IAppAction): ErrorLog => {
    switch (action.type) {
        case ActionType.ERROR_LOG:
            state.errors.push(action.payload);
            return { ...state };
        default:
            return state;
    }
};
