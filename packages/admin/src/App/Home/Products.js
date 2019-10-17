import React from "react";
import { getProducts, deleteProduct } from "./service.js";
import { Redirect } from "react-router-dom";

import { Table, Avatar, Button, Divider } from "antd";
import { Link } from "react-router-dom";
import "./Products.scss";

class Products extends React.Component {
  state = {
    products: { data: [] },
    loading: false,
    redirect: ""
  };

  async componentDidMount() {
    await this.loadProducts();
  }

  loadProducts = async () => {
    this.setState({ loading: true });
    const products = await getProducts();
    this.setState({ products, loading: false });
  };

  render() {
    const { products, loading, redirect } = this.state;

    if (redirect) return <Redirect to={redirect} />;

    const dataSource = products.data.map(
      ({ id, name, price, images, stock_status }) => ({
        key: id,
        id,
        name,
        price: "$" + price,
        stock_status,
        thumbnail: images[0]
      })
    );

    const columns = [
      {
        title: "Thumbnail",
        dataIndex: "thumbnail",
        key: "thumbnail",
        render: thumbnail => (
          <Avatar
            {...(thumbnail ? { src: thumbnail.url } : { icon: "camera" })}
            shape="square"
            size="large"
          />
        )
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "price",
        dataIndex: "price",
        key: "price"
      },
      {
        title: "Stock Status",
        dataIndex: "stock_status",
        key: "stock_status"
      },
      {
        title: "Action",
        dataIndex: "id",
        render: id => (
          <div className="operations">
            <Button type="link">Edit</Button>
            <Divider type="vertical" />
            <Button
              type="link"
              onClick={async evt => {
                evt.stopPropagation();
                await deleteProduct(id);
                await this.loadProducts();
              }}
            >
              Delete
            </Button>
          </div>
        )
      }
    ];

    return (
      <div className="Products">
        <div className="header">
          <Button type="primary">
            <Link to="/product/new">New Product</Link>
          </Button>
        </div>
        <Table
          loading={loading}
          onRow={record => ({
            onClick: evt => {
              this.setState({ redirect: `/product/${record.id}` });
            }
          })}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default Products;
