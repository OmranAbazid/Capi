import React from "react";
import { getOrders, DeleteOrder } from "./service.js";
import { Redirect } from "react-router-dom";

import { Table, Button, Card } from "antd";
import { Link } from "react-router-dom";
import "./Orders.scss";

class Orders extends React.Component {
  state = {
    orders: { data: [] },
    loading: false,
    redirect: ""
  };

  async componentDidMount() {
    await this.loadOrders();
  }

  loadOrders = async () => {
    this.setState({ loading: true });
    const orders = await getOrders();
    this.setState({ orders, loading: false });
  };

  render() {
    const { orders, loading, redirect } = this.state;

    if (redirect) return <Redirect to={redirect} />;

    const dataSource = orders.data.map(
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
          <Button type="primary">
            <Link to="/order/new">New Order</Link>
          </Button>
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
