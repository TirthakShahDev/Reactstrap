import { Model } from "./Helpers";
import * as _ from "lodash";

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
