import React from "react";
import { HashRouter as Router, Switch } from "react-router-dom";

import {
  PrivateRoute,
  Header,
  SideNav,
  // Footer,
  Product,
  Home,
  Orders,
  Order
} from "./";

import { Layout, Empty } from "antd";
const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Header />
        <Layout>
          <SideNav />
          <Layout
            style={{ padding: 24, overflow: "auto", height: "fit-content" }}
          >
            <Content
              style={{
                margin: 0,
                minHeight: 280,
                display: "table"
              }}
            >
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/product/:id" component={Product} />
                <PrivateRoute exact path="/orders" component={Orders} />
                <PrivateRoute exact path="/order/:id" component={Order} />
                <PrivateRoute
                  path="*"
                  render={() => <Empty description="404 Not Found" />}
                />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
