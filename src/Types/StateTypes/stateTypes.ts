import { IArticleData } from "api/types";

export interface IValidationFormState {
  email: string;
  password: string;
}

export interface IArticleState {
  articles: IArticleData[];
  modal: boolean;
  articleSelected?: IArticleData;
  titlesearch: string;
}

export interface ILoginState {
  UserName: string;
  PassWord: string;
}
