import Page from "../Components/Page";
import AccessDenied from "../pages/AccessDenied";
import React from "react";
import { AbilityContext } from "../abilityConfig/ability-context";
import { Common } from "../Constants/Common";
class DashboardPage extends React.Component {
  componentDidMount() {}
  static contextType = AbilityContext;

  render() {
    return this.context.can(Common.Actions.CAN_READ, Common.Modules.DASHBOARD) ? (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: "Dashboard", active: true }]}
      ></Page>
    ) : (
      <AccessDenied />
    );
  }
}
export default DashboardPage;
