import Page from "../Components/Page";
import AccessDenied from "../pages/AccessDenied";
import React from "react";
import { AbilityContext } from "../abilityConfig/ability-context";
import { Common } from "../Constants/Common";
import { withTranslation } from "react-i18next";
import { TFunction } from "i18next";
class DashboardPage extends React.Component<{ t: TFunction }> {
  static contextType = AbilityContext;
  render() {
    const { t } = this.props;
    return this.context.can(Common.Actions.CAN_READ, Common.Modules.DASHBOARD) ? (
      <Page
        className="DashboardPage"
        title={t('dashboard.title')}
        breadcrumbs={[{ name: t('route.dashboard'), active: true }]}
      ></Page>
    ) : (
      <AccessDenied />
    );
  }
}
export default withTranslation()(DashboardPage);
