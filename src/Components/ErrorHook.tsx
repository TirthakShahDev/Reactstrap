import React from "react";
import { connect } from "react-redux";
import * as AppActionCreators from "../actions/App.Actions";
import { bindActionCreators, Dispatch } from "redux";
import _ from "lodash";
import { IApplicationProps } from "../Types/PropTypes";
import { IErrorLogState } from "../Types/StateTypes";
import { IAppAction } from "../actions/Helpers";
import { IErrorLog } from "../state/ErrorLog";
// import { Redirect } from "react-router";

class ErrorHook extends React.PureComponent<
  { addError: (data: IErrorLog) => IAppAction },
  IErrorLogState
> {
  constructor(props: IApplicationProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({hasError : true})
    this.props.addError({ err: error, info: errorInfo});
  }

  render() {
    if (this.state.hasError) {
      return <></>;
    }

    return this.props.children;
  }
}
const mapDispatchtoProps = (dispatch: Dispatch) =>
  bindActionCreators(_.assign({}, AppActionCreators), dispatch);

export default connect(null, mapDispatchtoProps)(ErrorHook);
