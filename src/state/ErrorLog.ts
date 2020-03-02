import { Model } from "./Helpers";

export interface IErrorLog {
  err: Error;
  vm: string;
  info: string;
  url: string;
}

const ErrorModel = Model<IErrorLog>({
  err: null,
  vm: null,
  info: null,
  url: null
});

export class ErrorLog extends ErrorModel {
  public static ERRORS = "errors";
  public errors: IErrorLog[];
}
