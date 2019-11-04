import React from "react";

import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
const { Sider } = Layout;

export default function SideNav() {
  return (
    <Sider width={200} style={{ background: "#fff" }}>
      <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
        <NavItem activeRoutes={["/", "/product/*"]}>
          <Link to="/">Products</Link>
        </NavItem>
        <NavItem activeRoutes={["/orders", "/order/*"]}>
          <Link to="/orders">Orders</Link>
        </NavItem>
      </Menu>
    </Sider>
  );
}
