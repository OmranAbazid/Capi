import React, { Component } from "react";
import { Form, Input, Card, Button } from "antd";
import ReactQuill from "react-quill";
import { Upload, Icon, Modal } from "antd";
import "./Product.scss";
import Title from "antd/lib/typography/Title";
import { Redirect, Link } from "react-router-dom";
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage
} from "./service";

export default class Product extends Component {
  state = {
    id: this.props.match.params.id,
    name: "",
    description: "",
    fileList: [],
    price: "",
    quantity: 0,
    previewImage: "",
    previewVisible: false,
    redirect: null,
    isLoading: false,
    saved: false
  };

  isNew = () => this.props.match.params.id === "new";

  async componentDidMount() {
    if (this.isNew()) {
      const { id } = await createProduct();
      this.setState({ id });
    } else {
      this.setState({ isLoading: true });
      await this.loadProduct();
      this.setState({ isLoading: false });
    }
  }

  async componentWillUnmount() {
    if (this.isNew() && !this.state.saved) {
      await deleteProduct(this.state.id);
    }
  }

  loadProduct = async () => {
    const {
      name,
      description,
      images,
      price,
      stock_quantity
    } = await getProduct(this.state.id);

    const fileList = images.map(({ id, filename, url }) => ({
      uid: id,
      name: filename,
      status: "done",
      url
    }));

    this.setState({
      name,
      description,
      fileList,
      price,
      quantity: stock_quantity
    });
  };

  updateProduct = async () => {
    const { name, description, price, quantity } = this.state;
    await updateProduct(this.state.id, {
      name,
      description,
      regular_price: price,
      stock_quantity: quantity
    });

    this.setState({ saved: true, redirect: "/" });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleDescriptionChange = value => {
    this.setState({ description: value });
  };

  handleUpload = ({ fileList, file }) => {
    if (file.status === "done") {
      fileList[fileList.length - 1].uid = file.response[0].id;
    }
    this.setState({ fileList });
  };

  render() {
    const {
      name,
      description,
      price,
      quantity,
      previewVisible,
      previewImage,
      fileList,
      redirect,
      isLoading
    } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="Product">
        <Title level={2}>{this.isNew() ? "Create" : "Edit"} Product</Title>
        <Form>
          <Card bordered={false} loading={isLoading}>
            <Form.Item label="Title">
              <Input
                type="text"
                name="name"
                placeholder="Product name"
                onChange={this.onChange}
                value={name}
              />
            </Form.Item>
            <div className="ant-form-item-label">
              <label>Description</label>
            </div>
            <ReactQuill
              name="description"
              value={description}
              onChange={this.handleDescriptionChange}
            />
          </Card>
          <Card
            title="Images"
            className="imagesCard"
            bordered={false}
            loading={isLoading}
          >
            <Upload
              action={`api/products/${this.state.id}/images`}
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleUpload}
              onRemove={async ({ uid }) => {
                await deleteProductImage(this.state.id, uid);
              }}
              multiple
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Card>
          <Card
            title="Pricing & Quantity"
            className="pricingCard"
            bordered={false}
            loading={isLoading}
          >
            <Form.Item label="Price">
              <Input
                type="text"
                name="price"
                prefix={"$"}
                onChange={this.onChange}
                value={price}
              />
            </Form.Item>
            <Form.Item label="Quantity">
              <Input
                type="text"
                name="quantity"
                onChange={this.onChange}
                value={quantity}
              />
            </Form.Item>
          </Card>
          <Card className="stickyMenu" loading={isLoading}>
            <Link to='/'>
              <Button onClick={() => this.setState({ redirect: "/" })}>
                Cancel
              </Button>
            </Link>
            <Button type="primary" onClick={this.updateProduct}>
              Save
            </Button>
          </Card>
        </Form>
      </div>
    );
  }
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
