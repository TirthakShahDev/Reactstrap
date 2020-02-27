import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { Model } from './Helpers';
import { User } from './User';
import { Utility } from './Utility';
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
}

export const isAuthenticated = connectedRouterRedirect({
    redirectPath: '/account/login',
    authenticatedSelector: (state: AppState) => {
        if (state.authentication == null) {
            return false;
        }
        return true;
    },
    wrapperDisplayName: 'Authenticated',
}) as any;
