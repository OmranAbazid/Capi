import React from "react";
import { Route } from "react-router-dom";
import classnames from "classnames";
import { addHandler, removeHandler, request } from "request";

import { Login } from "./Login";

export default class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false
    };
  }

  componentDidMount() {
    addHandler(this.handleResponse);
  }

  handleResponse = (response, payload) => {
    if (response.status === 401) {
      this.setState({
        showLogin: true
      });
    } else if (response.status === 200) {
      this.setState({
        showLogin: false
      });
    }

    return response;
  };

  handleLoginSuccess = () => {
    this.setState({ showLogin: false });
    redoOutstandingRequests();
  };

  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          return (
            <>
              <div className={classnames("PrivateRoute")}>
                {!this.state.showLogin && (
                  <>
                    {this.props.render ? (
                      this.props.render(props)
                    ) : (
                      <Component {...props} />
                    )}
                  </>
                )}
              </div>
              {this.state.showLogin && (
                <Login {...props} onLogin={this.handleLoginSuccess} />
              )}
            </>
          );
        }}
      />
    );
  }

  componentWillUnmount() {
    removeHandler(this.handleResponse);
  }
}

const outstandingRequests = [];
addHandler((response, payload) => {
  if (response.url.includes("login")) return response;

  if (response.status === 401) {
    return new Promise((resolve, reject) => {
      outstandingRequests.push({ resolve, reject, payload });
    });
  }

  return response;
}, -1);

function redoOutstandingRequests() {
  outstandingRequests.forEach(async ({ resolve, reject, payload }) => {
    try {
      resolve(await request(payload));
    } catch (e) {
      reject(e);
    }
  });
  outstandingRequests.length = 0;
}
