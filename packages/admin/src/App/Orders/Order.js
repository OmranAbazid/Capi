import React, { Component } from "react";
import Title from "antd/lib/typography/Title";
import { Card, Row, Col, Button, Table, Modal } from "antd";
import { getOrder, deleteOrderItem } from "./service";
import "./Order.scss";

export default class Order extends Component {
  state = {
    id: this.props.match.params.id,
    date_created: "",
    items: [],
    shipping_address: {},
    status: "",
    isLoading: false,
    isModalOpen: false,
    isDeletingItem: false,
    selectedItem: ""
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.loadOrder();
    this.setState({ isLoading: false });
  }

  loadOrder = async () => {
    const { date_created, items, shipping_address, status } = await getOrder(
      this.state.id
    );

    this.setState({ date_created, items, shipping_address, status });
  };

  handleDeleteItem = async () => {
    this.setState({ isDeletingItem: true });
    await deleteOrderItem(this.state.id, this.state.selectedItem);
    
    this.setState(prev => ({
      items: prev.items.filter(item => item.id !== this.state.selectedItem),
      isModalOpen: false,
      isDeletingItem: true
    }));
  }

  onCancel = () => {
    this.setState({ isModalOpen: false });
  }

  render() {
    const {
      isLoading,
      date_created,
      items,
      shipping_address,
      status,
      isModalOpen,
      isDeletingItem
    } = this.state;

    const dataSource = items.map(
      ({ id, name, price, quantity, price_total }) => ({
        key: id,
        id,
        name,
        price: "$" + price,
        quantity,
        price_total
      })
    );

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price"
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity"
      },
      {
        title: "Subtotal",
        dataIndex: "price_total",
        key: "price_total"
      },
      {
        title: "Action",
        dataIndex: "id",
        render: id => (
          <div className="operations">
            <Button
              type="link"
              onClick={async evt => {
                evt.stopPropagation();
                this.setState({ isModalOpen: true, selectedItem: id });
              }}
            >
              Delete
            </Button>
          </div>
        )
      }
    ];

    return (
      <div className="Order">
        <Title level={2}> Order Details</Title>
        <Row>
          <Col span={16}>
            <Card
              title="Overview"
              extra={new Date(date_created).toLocaleString()}
            >
              <Table
                loading={isLoading}
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
              <Row>
                <Col className="status" span={8}>
                  <span>Status: </span>
                  <span>{status || "Order placed"}</span>
                </Col>
                <Col className="total" span={6} push={10}>
                  <span>Total Amount: </span>
                  <span>
                    $
                    {dataSource.reduce(
                      (prev, { price_total }) => prev + price_total,
                      0
                    )}
                  </span>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={7} push={1}>
            <Card title="Customer Details">col-6 col-pull-18</Card>
          </Col>
        </Row>
        <Modal
          title="Delete Order Item"
          visible={isModalOpen}
          onCancel={this.onCancel}
          footer={[
            <Button key="cancel" onClick={this.onCancel}>
              Cancel
            </Button>,
            <Button key="confirm" type="primary" loading={isDeletingItem} onClick={this.handleDeleteItem}>
              Confirm
            </Button>,
          ]}
        >
          <p>Are you sure to delete this item?</p>
        </Modal>
      </div>
    );
  }
}
