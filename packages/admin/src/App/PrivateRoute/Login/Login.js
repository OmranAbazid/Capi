import React from "react";

import { login } from "./service";
import "./Login.scss";
import { Form, Icon, Input, Button, Typography, Alert } from "antd";

const { Title } = Typography;

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      waitingForServer: false,
      error: null
    };

    this.passwordField = React.createRef();
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  submit = async evt => {
    evt.preventDefault();

    const { username, password } = this.state;

    this.setState({ waitingForServer: true });

    const authResult = await login(username, password);

    this.setState({ waitingForServer: false });

    if (authResult.id_token) {
      this.props.onLogin(authResult.id_token);
    } else {
      const error = authResult.errorMessage || "error";
      this.setState({ error });
      this.passwordField.current.focus();
      this.passwordField.current.select();
    }
  };

  render() {
    const { username, password, waitingForServer, error } = this.state;
    return (
      <Form className="Login">
        <Title>CAPI</Title>
        <div className="controls">
          {error ? <Alert message={error} type="error" /> : ""}

          <Form.Item>
            <Input
              type="text"
              name="username"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="email"
              onChange={this.handleInputChange}
              value={username}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              value={password}
              onChange={this.handleInputChange}
              name="password"
              type="password"
              placeholder="Password"
              ref={this.passwordField}
            />
          </Form.Item>
        </div>
        <Button
          disabled={waitingForServer}
          onClick={this.submit}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Log in
        </Button>
      </Form>
    );
  }
}
