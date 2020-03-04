import { IAppAction, ActionType } from "./Helpers";
import { match } from "react-router";
import { User } from "../state/User";
import { IErrorLog } from "../state/ErrorLog";
import { LoginModel } from "Models/LoginModel";
import { login as LoginUser } from "../api/users";
import ability from "../abilityConfig/ability";
import { ConvertAbility } from "utils/AbilityConverter";
import { RawRule } from "@casl/ability";
export interface IApplicationProps {
  loginAsync: (loginModel: any) => Promise<IAppAction>;
  login: (loginModel: any) => IAppAction;
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

export const loginAsync = (loginModel: LoginModel) => {
  return function(dispatch: any) {
    return LoginUser(loginModel)
      .then(async ({ data }) => {
        let abilities: RawRule[] = ConvertAbility(data.permissions);
        ability.update(abilities);
        data.abilities = abilities;
        await dispatch(login(data));
      })
      .catch(m => console.log(m))
      .finally();
  };
};

export const login = (data: any): IAppAction => {
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
