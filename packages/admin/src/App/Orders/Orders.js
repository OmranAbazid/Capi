import React from "react";
import { getOrders } from "./service.js";
import { Redirect } from "react-router-dom";

import { Table, Card, Input } from "antd";
import { memoize } from "utils";
import "./Orders.scss";

const { Search } = Input;

class Orders extends React.Component {
  state = {
    orders: { data: [] },
    loading: false,
    redirect: "",
    orderList: []
  };

  async componentDidMount() {
    await this.loadOrders();
  }

  loadOrders = async () => {
    this.setState({ loading: true });
    const orders = await getOrders();
    this.setState({ orders, loading: false, orderList: orders.data });
  };

  getResults = memoize((query) => {
    const { data } = this.state.orders;
    const found = [];

    if (!query.length) {
      return data;
    }
    else {
      data.forEach(order => {
        if (order.shipping_address.full_name.toLowerCase().includes(query)) {
          found.push(order);
        }
        else {
          for (const item of order.items) {
            if (item.name.toLowerCase().includes(query)) {
              found.push(order);
              break;
            }
          }
        }
      });
      return found;
    }
  });

  handleInputChange = (evt) => {
    this.setState({
      orderList: this.getResults(evt.target.value.toLowerCase())
    })
  }

  render() {
    const { loading, redirect, orderList } = this.state;

    if (redirect) return <Redirect to={redirect} />;

    const dataSource = orderList.map(
      ({
        id,
        date_created,
        items,
        shipping_address: { full_name },
        status
      }) => ({
        key: id,
        id,
        created: new Date(date_created).toLocaleString(),
        name: full_name,
        total: "$" + items.reduce((prev, item) => prev + item.price_total, 0),
        status: status || "Order placed"
      })
    );

    const columns = [
      {
        title: "Created",
        dataIndex: "created",
        key: "created"
      },
      {
        title: "Customer",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status"
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total"
      }
    ];

    return (
      <Card className="Orders">
        <div className="header">
          <Search
            placeholder="Search order"
            onChange={this.handleInputChange}
            style={{ width: 200 }}
          />
        </div>
        <Table
          loading={loading}
          onRow={record => ({
            onClick: evt => {
              this.setState({ redirect: `/order/${record.id}` });
            }
          })}
          dataSource={dataSource}
          columns={columns}
        />
      </Card>
    );
  }
}

export default Orders;
