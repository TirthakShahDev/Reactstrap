import { Model } from "./Helpers";

export interface IErrorLog {
  err: Error;
  vm: string;
  info: string;
  url: string;
}

interface IErrors
{
  errors? : IErrorLog[]
}

const ErrorModel = Model<IErrors>(
  {
    errors : []
  }
);

export class ErrorLog extends ErrorModel {
  public static ERRORS = "errors";
  public errors: IErrorLog[];
}
