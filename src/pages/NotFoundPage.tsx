import Page from "../Components/Page";
import React from "react";
class NotFoundPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
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
