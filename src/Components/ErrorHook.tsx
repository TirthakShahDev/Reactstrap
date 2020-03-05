import React from "react";
import { connect } from "react-redux";
import * as AppActionCreators from "../actions/App.Actions";
import { bindActionCreators, Dispatch } from "redux";
import _ from "lodash";
import { IApplicationProps } from "../Types/PropTypes";
import { IErrorLogState } from "../Types/StateTypes";
import { IAppAction } from "../actions/Helpers";
import { IErrorLog } from "../state/ErrorLog";

class ErrorHook extends React.PureComponent<
  { addError: (data: IErrorLog) => IAppAction },
  IErrorLogState
> {
  constructor(props: IApplicationProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    debugger;
    this.props.addError({ err: error, vm: "", info: errorInfo, url: "" });
  }

  render() {
    // console.log(this.props.addError)
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
const mapDispatchtoProps = (dispatch: Dispatch) =>
  bindActionCreators(_.assign({}, AppActionCreators), dispatch);

export default connect(null, mapDispatchtoProps)(ErrorHook);
