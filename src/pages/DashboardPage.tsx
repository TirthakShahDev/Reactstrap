import Page from "../Components/Page";
import React from "react";
class DashboardPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: "Dashboard", active: true }]}
      ></Page>
    );
  }
}
export default DashboardPage;
