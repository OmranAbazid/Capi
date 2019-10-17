import React from "react";
import { Layout, Button } from "antd";
import { Link } from "react-router-dom";
import { logout } from "./service";
import { withRouter } from "react-router-dom";
import "./Header.scss";

const { Header: Head } = Layout;

export default withRouter(function Header(props) {
  return (
    <Head className="Header">
      <div className="logo">
        <Link to="/">CAPI</Link>
      </div>
      <div className="logout">
        <Button
          type="link"
          onClick={async () => {
            await logout();
            props.history.push("/logout");
            props.history.replace("/");
          }}
        >
          Logout
        </Button>
      </div>
    </Head>
  );
});
