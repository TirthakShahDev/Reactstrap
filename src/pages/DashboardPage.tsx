// import { AnnouncementCard, TodosCard } from 'components/Card';
// import HorizontalAvatarList from 'components/HorizontalAvatarList';
// import MapWithBubbles from 'components/MapWithBubbles';
 import Page from '../Components/Page';
// import ProductMedia from 'components/ProductMedia';
// import SupportTicket from 'components/SupportTicket';
// import UserProgressTable from 'components/UserProgressTable';
// import { IconWidget, NumberWidget } from 'components/Widget';
// import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
// import {
//   avatarsData,
//   chartjs,
//   productsData,
//   supportTicketsData,
//   todosData,
//   userProgressTableData,
// } from 'demos/dashboardPage';
import React from "react";
// import { Bar, Line } from 'react-chartjs-2';
// import {
//   MdBubbleChart,
//   MdInsertChart,
//   MdPersonPin,
//   MdPieChart,
//   MdRateReview,
//   MdShare,
//   MdShowChart,
//   MdThumbUp,
// } from 'react-icons/md';
// import InfiniteCalendar from 'react-infinite-calendar';
// import {
//   Badge,
//   Button,
//   Card,
//   CardBody,
//   CardDeck,
//   CardGroup,
//   CardHeader,
//   CardTitle,
//   Col,
//   ListGroup,
//   ListGroupItem,
//   Row,
// } from 'reactstrap';
// import { getColor } from "../utils/colors";

// const today = new Date();
// const lastWeek = new Date(
//   today.getFullYear(),
//   today.getMonth(),
//   today.getDate() - 7,
// );

class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    // const primaryColor = getColor("primary");
    // const secondaryColor = getColor('secondary');

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
