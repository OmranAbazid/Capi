import React from "react";

import { Layout, Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
const { Sider } = Layout;

export default withRouter(function SideNav({ location }) {
  return (
    <Sider width={200} style={{ background: "#fff" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="/">
          <Link to="/">Products</Link>
        </Menu.Item>
        <Menu.Item key="/orders">
          <Link to="/orders">Orders</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
});
