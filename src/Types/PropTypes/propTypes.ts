import { IAppAction } from "actions/Helpers";
import { match } from "react-router";
import { User } from "state/User";
import { IErrorLog } from "state/ErrorLog";
import { TFunction } from "i18next";
import { ILoginState } from "Types/StateTypes";

export interface IApplicationProps {
  loginAsync: (loginModel: ILoginState) => Promise<IAppAction>;
  login: (loginModel: ILoginState) => IAppAction;
  logout: () => IAppAction;
  addError: (data: IErrorLog) => IAppAction;
  match: match<any>;
  location: any;
  history: any;
  userData: User;
  errors: IErrorLog[];
  sidebarOpen: boolean;
  changeLanguage: (language: any) => IAppAction;
}

export interface IArticleProps extends IApplicationProps {
  t: TFunction;
}

export interface ILoginProps extends IApplicationProps {
  usernameLabel: string;
  usernameInputProps: any;
  passwordLabel: string;
  passwordInputProps: any;
  dispatch : any;
}
