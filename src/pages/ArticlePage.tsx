import Page from "../Components/Page";
import React from "react";
import {
  BootstrapTable,
  TableHeaderColumn,
  SortOrder
} from "react-bootstrap-table";
import { Button, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { IApplicationProps } from "../actions/App.Actions";
import { getArticles as GetArticles } from "../api/articles";
import { IArticleData } from "../api/types";
import { parseTime, ConvertToTableFilter } from "../utils";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
interface IArticleProps extends IApplicationProps { }

interface IArticleState {
  articles: IArticleData[];
}

class ArticlePage extends React.Component<IArticleProps, IArticleState> {
  private tableKey = 0;
  private list: IArticleData[] = [];
  private total = 0;
  private listLoading = true;
  private listQuery = {
    page: 1,
    limit: 20,
    importance: undefined,
    title: undefined,
    type: undefined,
    sort: "+id"
  };

  constructor(props: Readonly<IApplicationProps>) {
    super(props);
    this.state = {
      articles: []
    };
    this.getArticlesasync();
  }

  private formatData(
    cell: any,
    row: any,
    formatExtraData: any,
    rowIndex: number
  ): any {
    return parseTime(cell);
  }

  private handleFilter() {
    this.listQuery.page = 1;
    this.getArticlesasync();
  }

  private sortChange(sortName: string | number | symbol, sortOrder: SortOrder) {
    this.listQuery.sort = ConvertToTableFilter(sortName, sortOrder);
    this.handleFilter();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  private async getArticlesasync() {
    this.listLoading = true;
    const { data } = await GetArticles(this.listQuery);
    this.list = data.items;
    this.total = data.total;
    this.setState({ articles: this.list });
  }
  onClickProductSelected(cell: any, row, rowIndex) {
    console.log(cell);
    console.log(row);
  }


  cellButton(cell: any, row: any, formatExtraData: any, rowIndex: number) {
    return (
      <div>
        <Button color="primary" className="btn btn-primary btn-xs"
          onClick={() =>
            this.onClickProductSelected(cell, row, rowIndex)}>
          <FaPencilAlt />
        </Button>
        <Button color="danger" className="btn-xs"
          onClick={() =>
            this.onClickProductSelected(cell, row, rowIndex)}>
          <FaTrash />
        </Button>
      </div>
    )
  }
  render() {
    return (
      <Page
        className="Articlemanage"
        title="Manage Article"
        breadcrumbs={[{ name: "Article", active: true }]}
      >
        <Row>
          <Col md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
              </CardHeader>
              <CardBody>
                <BootstrapTable
                  data={this.state.articles}
                  version="4"
                  options={{
                    onSortChange: (
                      sortName: string | number | symbol,
                      sortOrder: SortOrder
                    ) => this.sortChange(sortName, sortOrder),

                  }}
                  pagination={true}
                  hover={true}
                >
                  <TableHeaderColumn
                    dataField="id"
                    isKey={true}
                    dataAlign="center"
                    dataSort={true}
                  >
                    Article ID
          </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="timestamp"
                    dataAlign="center"
                    dataSort={true}
                    dataFormat={(cell, row, formatExtraData, rowIndex) =>
                      this.formatData(cell, row, formatExtraData, rowIndex)
                    }
                  >
                    Date
          </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="title"
                    dataAlign="center"
                    dataSort={true}
                  >
                    Title
          </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="author"
                    dataAlign="center"
                    dataSort={true}
                  >
                    Author
          </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="reviewer"
                    dataAlign="center"
                    dataSort={true}
                  >
                    Reviewer
          </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='button'
                    dataFormat={this.cellButton.bind(this)}
                  >
                    Actions
          </TableHeaderColumn>
                </BootstrapTable>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default ArticlePage;
