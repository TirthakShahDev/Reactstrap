import logo200Image from "../assets/img/logo/logo_200.png";
import sidebarBgImage from "../assets/img/sidebar/sidebar-4.jpg";
import React from "react";
import { MdDashboard, MdWidgets } from "react-icons/md";
import SourceLink from "../Components/SourceLink";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavItem, NavLink as BSNavLink } from "reactstrap";
import bn from "../utils/bemnames";
import { Can } from "../abilityConfig/ability-context";
import { Common } from "../Constants/Common";
const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat"
};

const navItems = [
  { to: "/", name: "DashBoard", exact: true, Icon: MdDashboard },
  { to: "/Articles", name: "Article", exact: true, Icon: MdWidgets }
];

const bem = bn.create("sidebar");

class Sidebar extends React.Component {
  state = {
    isOpenComponents: false,
    isOpenContents: false,
    isOpenPages: false
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e("background")} style={sidebarBackground} />
        <div className={bem.e("content")}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">React</span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <Can I={Common.Actions.CAN_READ} a={name}>
                <NavItem key={index} className={bem.e("nav-item")}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e("nav-item-icon")} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              </Can>
            ))}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
