import React, { Component } from "react";
import * as AppActionCreators from "./actions/App.Actions";
import { withRouter, Switch, Redirect } from "react-router";
import { connect } from "react-redux";
import { AppState } from "./state/AppState";
import { bindActionCreators, Dispatch } from "redux";
import _ from "lodash";
import { EmptyLayout, LayoutRoute } from './Layout';
import AuthPage from "./Components/AuthPage";
import { IApplicationProps } from "./actions/App.Actions";
interface IAppProps extends IApplicationProps {}
interface IState {}
class App extends Component<IAppProps, IState> {
  constructor(props : IAppProps) {
    super(props);
    this.state = { isOpen: false };
  }
  render() {
    return <Switch>
      <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={(props:any) => (
                <AuthPage {...props} />
              )}
            />
            <Redirect to="/login" />
    </Switch>;
  }
}
const mapStateToProps = (state: AppState) => ({
  authentication: state.authentication,
  users: state.users,
  utility: state.utility
});
const mapDispatchtoProps = (dispatch: Dispatch) =>
  bindActionCreators(_.assign({}, AppActionCreators), dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchtoProps)(App as any) as any
);
