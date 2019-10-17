import React from "react";

import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Sider } = Layout;

export default function SideNav() {
  return (
    <Sider width={200} style={{ background: "#fff" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1">
          <Link to="/">Products</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/orders">Orders</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
