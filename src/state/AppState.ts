import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { Model } from './Helpers';
import { User } from './User';
import { Utility } from './Utility';
import Cookies from 'js-cookie'

export interface IAppState {
    authentication?: User;
    users?: any;
    utility?: Utility;
}

export const AppStateModel = Model<IAppState>({
    authentication: null,
    users: null,
    utility: null,
});

export class AppState extends AppStateModel {
    public USERS: 'users';
    public static AUTHENTICATION = 'authentication';
    public authentication: User;
    public users: any;
    public utility: Utility;
    public Auth_Token : string = getToken() || '';
}

const tokenKey = 'AccessToken'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)

export const isAuthenticated = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatedSelector: (state: AppState) => {
        if (state.authentication == null || state.authentication.token === null || state.authentication.token === '') {
            return false;
        }
        return true;
    },
    wrapperDisplayName: 'Authenticated',
}) as any;
