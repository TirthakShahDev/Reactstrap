import Page from "../Components/Page";
import React from "react";
class NotFoundPage extends React.Component {
  componentDidMount() {
    alert();
  }

  render() {
    return (
      <Page
        className="NotFOund"
        title="Not Found"
        breadcrumbs={[]}
      ></Page>
    );
  }
}
export default NotFoundPage;
