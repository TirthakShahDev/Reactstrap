import Avatar from "../Components/Avatar";
import React from "react";
import { MdClearAll, MdExitToApp } from "react-icons/md";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody
} from "reactstrap";
import bn from "../utils/bemnames";
import { IAppAction } from "../actions/Helpers";

const bem = bn.create("header");

class Header extends React.Component<{logout: () => IAppAction}> {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector(".cr-sidebar").classList.toggle("cr-sidebar--open");
  };

  render() {
    return (
      <Navbar light expand className={bem.b("bg-white")}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar className={bem.e("nav-right")}>
          <NavItem>
            <NavLink id="Popover2">
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <ListGroup flush>
                  <ListGroupItem tag="button" action className="border-light" onClick={() => this.props.logout()}>
                    <MdExitToApp /> Signout
                  </ListGroupItem>
                </ListGroup>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
