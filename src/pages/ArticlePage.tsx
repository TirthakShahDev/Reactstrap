import Page from "../Components/Page";
import React from "react";
import {
  BootstrapTable,
  TableHeaderColumn,
  SortOrder
} from "react-bootstrap-table";
import * as ReactStrap from "reactstrap";
import confirm from "reactstrap-confirm";
import { IApplicationProps } from "../Types/PropTypes";
import { getArticles as GetArticles } from "../api/articles";
import { IArticleData } from "../api/types";
import { parseTime, ConvertToTableFilter } from "../utils";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { defaultArticleData } from "../api/articles";
import _ from "lodash";
import { Can, AbilityContext } from "../abilityConfig/ability-context";
import AccessDenied from "./AccessDenied";
import { Common } from "../Constants/Common";
import { withTranslation } from "react-i18next";
import { IArticleProps } from "../Types/PropTypes";
import { IArticleState } from "../Types/StateTypes";

class ArticlePage extends React.Component<IArticleProps, IArticleState> {
  private list: IArticleData[] = [];
  private mode: string | "Add" | "Edit";
  private listQuery = {
    page: 1,
    limit: 20,
    importance: undefined,
    title: undefined,
    type: undefined,
    sort: "+id"
  };
  static contextType = AbilityContext;
  constructor(props: Readonly<IApplicationProps>) {
    super(props);
    this.state = {
      articles: [],
      modal: false,
      articleSelected: defaultArticleData,
      titlesearch: undefined
    };
  }

  componentDidMount() {
    // throw new Error("assaddas");
    this.getArticlesasync();
  }

  private formatDate(
    cell: any,
    row: any,
    formatExtraData: any,
    rowIndex: number
  ): any {
    return parseTime(cell, "{y}-{m}-{d}");
  }

  private ResetModalData = () => {
    this.setState({
      articleSelected: defaultArticleData
    });
  };

  private toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  private AddArticle = () => {
    this.mode = "Add";
    this.toggle();
  };
  private SaveArticle = () => {
    //Call API to do Server Data Changes
    this.setState(
      {
        articleSelected: Object.assign({}, this.state.articleSelected, {
          id: _.maxBy(this.state.articles, "id").id
        })
      },
      () => {
        this.state.articles.push(this.state.articleSelected);
        this.toggle();
      }
    );
  };

  private handleFilter() {
    this.listQuery.page = 1;
    this.getArticlesasync();
  }

  private sortChange(sortName: string | number | symbol, sortOrder: SortOrder) {
    this.listQuery.sort = ConvertToTableFilter(sortName, sortOrder);
    this.handleFilter();
  }

  private async getArticlesasync() {
    const { data } = await GetArticles(this.listQuery);
    this.list = data.items;
    this.setState({ articles: this.list });
  }

  private onClickProductSelected(cell: any, row: any, rowIndex: number) {
    this.mode = "Edit";
    this.setState({ articleSelected: Object.assign({}, null) }, () => {
      this.setState({ articleSelected: Object.assign({}, row) });
      this.toggle();
    });
  }

  private async DeleteArticle(cell: any, row: any, rowIndex: number) {
    let result = await confirm({
      title: <>Article "{row.title}" Delete</>
    });
    if (result) {
      //Call API to do Server Data Changes
      let articleList = this.state.articles.filter(m => m.id !== row.id);
      this.setState({ articles: articleList });
    }
  }

  private handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    this.setState({
      articleSelected: Object.assign({}, this.state.articleSelected, {
        [evt.target.name]: value
      })
    });
  }

  private actionButtons(
    cell: any,
    row: any,
    formatExtraData: any,
    rowIndex: number
  ) {
    return (
      <div>
        <Can I={Common.Actions.CAN_UPDATE} a={Common.Modules.ARTICLE}>
          <ReactStrap.Button
            color={Common.Colors.PRIMARY}
            className="btn btn-primary btn-xs"
            onClick={() => this.onClickProductSelected(cell, row, rowIndex)}
          >
            <FaPencilAlt />
          </ReactStrap.Button>
        </Can>{" "}
        <Can I={Common.Actions.CAN_DELETE} a={Common.Modules.ARTICLE}>
          <ReactStrap.Button
            color={Common.Colors.DANGER}
            className="btn-xs"
            onClick={() => this.DeleteArticle(cell, row, rowIndex)}
          >
            <FaTrash />
          </ReactStrap.Button>
        </Can>
      </div>
    );
  }

  render() {
    const { t } = this.props;

    return this.context.can(Common.Actions.CAN_READ, Common.Modules.ARTICLE) ? (
      <Page
        title={t("article.title")}
        breadcrumbs={[{ name: t("route.article"), active: true }]}
      >
        <ReactStrap.Row>
          <ReactStrap.Col md="12" sm="12" xs="12">
            <ReactStrap.Card>
              <ReactStrap.CardHeader>
                <div className="filter-container">
                  <ReactStrap.Input
                    type="text"
                    placeholder={t("article.tabletitle")}
                    value={this.state.titlesearch}
                    className="filter-item"
                    style={{ width: "200px" }}
                    onChange={e => this.handleChange(e)}
                    onKeyUp={() => this.handleFilter()}
                  ></ReactStrap.Input>
                  <Can I="CanCreate" a="Article">
                    <ReactStrap.Button
                      color={Common.Colors.PRIMARY}
                      onClick={() => this.AddArticle()}
                      className="filter-item"
                    >
                      {t("permission.createArticle")}
                    </ReactStrap.Button>
                  </Can>
                </div>
              </ReactStrap.CardHeader>

              <ReactStrap.CardBody>
                <BootstrapTable
                  data={this.state.articles}
                  version="4"
                  options={{
                    onSortChange: (
                      sortName: string | number | symbol,
                      sortOrder: SortOrder
                    ) => this.sortChange(sortName, sortOrder)
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
                    {t("article.id")}
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="timestamp"
                    dataAlign="center"
                    dataSort={true}
                    dataFormat={(cell, row, formatExtraData, rowIndex) =>
                      this.formatDate(cell, row, formatExtraData, rowIndex)
                    }
                  >
                    {t("article.date")}
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="title"
                    dataAlign="center"
                    dataSort={true}
                  >
                    {t("article.tabletitle")}
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
                    {t("article.reviewer")}
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="button"
                    dataAlign="center"
                    dataFormat={this.actionButtons.bind(this)}
                  >
                    {t("article.actions")}
                  </TableHeaderColumn>
                </BootstrapTable>
              </ReactStrap.CardBody>
            </ReactStrap.Card>
          </ReactStrap.Col>
        </ReactStrap.Row>
        <ReactStrap.Modal
          isOpen={this.state.modal}
          toggle={() => this.toggle()}
          onClosed={() => this.ResetModalData()}
        >
          <ReactStrap.ModalHeader toggle={() => this.toggle()}>
            {this.mode === Common.Modes.ADD
              ? t("permission.createArticle")
              : t("permission.editArticle")}
          </ReactStrap.ModalHeader>
          <ReactStrap.ModalBody>
            <ReactStrap.Form>
              <ReactStrap.FormGroup row>
                <ReactStrap.Label sm={2}>
                  {t("article.tabletitle")}
                </ReactStrap.Label>
                <ReactStrap.Col sm={10}>
                  <ReactStrap.Input
                    type="text"
                    name="title"
                    placeholder={t("article.tabletitle")}
                    value={this.state.articleSelected.title}
                    onChange={e => this.handleChange(e)}
                  />
                </ReactStrap.Col>
              </ReactStrap.FormGroup>
              <ReactStrap.FormGroup row>
                <ReactStrap.Label sm={2}>{t("article.date")}</ReactStrap.Label>
                <ReactStrap.Col sm={10}>
                  <ReactStrap.Input
                    type="text"
                    name="timestamp"
                    value={parseTime(
                      this.state.articleSelected.timestamp,
                      Common.DATEFORMAT
                    )}
                    onChange={e => this.handleChange(e)}
                    placeholder={t("article.date")}
                  />
                </ReactStrap.Col>
              </ReactStrap.FormGroup>
              <ReactStrap.FormGroup row>
                <ReactStrap.Label sm={2}>
                  {t("article.author")}
                </ReactStrap.Label>
                <ReactStrap.Col sm={10}>
                  <ReactStrap.Input
                    type="text"
                    name="author"
                    placeholder={t("article.author")}
                    value={this.state.articleSelected.author}
                    onChange={e => this.handleChange(e)}
                  />
                </ReactStrap.Col>
              </ReactStrap.FormGroup>
              <ReactStrap.FormGroup row>
                <ReactStrap.Label sm={2}>
                  {t("article.reviewer")}
                </ReactStrap.Label>
                <ReactStrap.Col sm={10}>
                  <ReactStrap.Input
                    type="text"
                    name="reviewer"
                    placeholder={t("article.reviewer")}
                    value={this.state.articleSelected.reviewer}
                    onChange={e => this.handleChange(e)}
                  />
                </ReactStrap.Col>
              </ReactStrap.FormGroup>
            </ReactStrap.Form>
          </ReactStrap.ModalBody>
          <ReactStrap.ModalFooter>
            <ReactStrap.Button
              color={Common.Colors.PRIMARY}
              onClick={() => this.SaveArticle()}
            >
              {this.mode === Common.Modes.ADD
                ? t("permission.save")
                : t("permission.save")}
            </ReactStrap.Button>{" "}
            <ReactStrap.Button
              color={Common.Colors.SECONDARY}
              onClick={() => this.toggle()}
            >
              {t("permission.cancel")}
            </ReactStrap.Button>
          </ReactStrap.ModalFooter>
        </ReactStrap.Modal>
      </Page>
    ) : (
      <AccessDenied />
    );
  }
}
export default withTranslation<>()(ArticlePage);
