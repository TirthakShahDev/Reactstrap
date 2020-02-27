import { IAppAction, ActionType } from './Helpers';
import { match } from 'react-router';
import { User } from '../state/User';
import { IErrorLog } from '../state/ErrorLog';
export interface IApplicationProps {
    login: (data: any) => IAppAction;
    logout: () => IAppAction;
    addError: (data: any) => IAppAction;
    match: match<any>;
    location: any;
    history: any;
    authentication: User;
    users: any;
    errors: IErrorLog[];
    toggleSideBar: () => IAppAction;
    sidebarOpen: boolean;
}

export const login = (data: any): IAppAction => {
    console.log(data);
    return { type: ActionType.LOGIN_REQUEST, payload: data };
};

export const logout = (): IAppAction => {
    return { type: ActionType.LOGOUT_REQUEST };
};

export const addError = (data: IErrorLog[]): IAppAction => {
    return { type: ActionType.ERROR_LOG, payload: data };
};

export const toggleSideBar = (): IAppAction => {
    return { type: ActionType.TOGGLE_SIDEBAR };
};
