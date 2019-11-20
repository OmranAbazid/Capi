import React from "react";
import { getProducts, deleteProduct } from "./service.js";
import { Redirect } from "react-router-dom";

import { Table, Avatar, Button, Divider, Input, Modal } from "antd";
import { Link } from "react-router-dom";
import "./Products.scss";

const { Search } = Input;
function memoize(func) {
  const cache = new Map();
  return function(...args) {
      // Use first argument as key
      const key = args[0];
      if (cache.has(key)) {
          return cache.get(key);
      }
      const val = func.apply(this, arguments);
      cache.set(key, val);
      return val;
  };
}
class Products extends React.Component {
  state = {
    products: { data: [] },
    loading: false,
    redirect: "",
    productList: [],
    selectedProd: null,
    isDeletingProd: false,
  };

  async componentDidMount() {
    await this.loadProducts();
  }

  loadProducts = async () => {
    this.setState({ loading: true });
    const products = await getProducts();
    this.setState({ products, loading: false, productList: products.data });
  };

  getResults = memoize((query) => {
    const value = query.toLowerCase();
    const { data } = this.state.products;
    const found = [];

    if (!value.length) {
      return data;
    }
    else {
      data.forEach(prod => {
        if (prod.name.toLowerCase().includes(value) || prod.description.toLowerCase().includes(value)) {
          found.push(prod);
        }
      });
      return found;
    }
  });

  handleInputChange = (evt) => {
    this.setState({
      productList: this.getResults(evt.target.value)
    })
  }

  handleDeleteProd = async () => {
    this.setState({ isDeletingProd: true });
    await deleteProduct(this.state.selectedProd);
    await this.loadProducts();
    this.setState({
      selectedProd: null,
      isDeletingProd: false
    });
  }

  onCancel = () => {
    this.setState({ selectedProd: null });
  }

  render() {
    const { loading, redirect, selectedProd, isDeletingProd, productList } = this.state;

    if (redirect) return <Redirect to={redirect} />;

    const dataSource = productList.map(
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
                this.setState({ selectedProd: id });
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
          <Search
            placeholder="Search product"
            onChange={this.handleInputChange}
            style={{ width: 200 }}
          />
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
        <Modal
          title="Delete Product"
          visible={!!selectedProd}
          onCancel={this.onCancel}
          footer={[
            <Button key="cancel" onClick={this.onCancel}>
              Cancel
            </Button>,
            <Button key="confirm" type="primary" loading={isDeletingProd} onClick={this.handleDeleteProd}>
              Confirm
            </Button>,
          ]}
        >
          <p>Are you sure you want to delete this product?</p>
        </Modal>
      </div>
    );
  }
}

export default Products;
