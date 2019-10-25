import React from "react";
import { withRouter } from "react-router-dom";
import { matchPath } from "react-router";
import { Menu } from "antd";
import classnames from "classnames";

export default withRouter(function NavItem({
  staticContext,
  location: { pathname },
  activeRoutes,
  ...props
}) {
  const isActive =
    matchPath(pathname, {
      path: activeRoutes,
      exact: true
    }) !== null;

  return (
    <Menu.Item
      {...props}
      className={classnames(
        { "ant-menu-item-selected": isActive },
        props.className
      )}
    />
  );
});
