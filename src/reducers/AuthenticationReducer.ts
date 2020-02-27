import { IAppAction, ActionType } from './../actions/Helpers';
import { User } from '../state/User';

export const AuthenticationReducer = (state: User = null, action: IAppAction): User => {
    switch (action.type) {
        case ActionType.LOGIN_REQUEST:
            return { ...state, name: 'Dummy User', email: action.payload.username, roles: ['Admin'] };
        case ActionType.LOGOUT_REQUEST:
            return null;
        default:
            return state;
    }
};
