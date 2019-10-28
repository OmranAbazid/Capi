import React, { Component } from "react";
import { Form, Input, Card, Button } from "antd";
import ReactQuill from "react-quill";
import { Upload, Icon, Modal } from "antd";
import "./Product.scss";
import Title from "antd/lib/typography/Title";
import { Redirect } from "react-router-dom";
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProductImage
} from "./service";

export default class Product extends Component {
  state = {
    id: this.props.match.params.id,
    name: "",
    description: "",
    fileList: [],
    imageFileList: [],
    price: "",
    quantity: 0,
    previewImage: "",
    previewVisible: false,
    redirect: null,
    isLoading: false
  };

  isNew = () => this.props.match.params.id === "new";

  async componentDidMount() {
    if (!this.isNew()) {
      this.setState({ isLoading: true });
      await this.loadProduct();
      this.setState({ isLoading: false });
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
    const imageFileList = fileList.map(file => file.uid);

    this.setState({
      name,
      description,
      fileList,
      price,
      quantity: stock_quantity,
      imageFileList
    });
  };

  updateProduct = async () => {
    const { name, description, price, quantity, fileList, imageFileList, id } = this.state;
    const prevImages = fileList.filter(file => imageFileList.includes(file.uid)).map(file => file.uid);
    const newImageFileList = fileList.filter(file => !imageFileList.includes(file.uid));
    let productId = id;
    if (this.isNew()) {
      const { id } = await createProduct();
      productId = id;
    }

    const formData = new FormData();
    newImageFileList.forEach(file => {
      formData.append("files[]", file.originFileObj);
    });

    if (newImageFileList.length) {
      (await fetch(`/api/products/${productId}/images`, {
        'method': 'POST',
        'body': formData,
        'Content-Type': 'multipart/form-data'
      })).json();
    }

    imageFileList.forEach(async (id) => {
      // image has been removed
      if (!prevImages.includes(id)) {
        await deleteProductImage(productId, id);
      }
    });

    await updateProduct(productId, {
      name,
      description,
      regular_price: price,
      stock_quantity: quantity
    });

    this.setState({ redirect: "/" });
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

  handleRemove = (file) => {
    const fileList = this.state.fileList.filter(f => f !== file);
    this.setState({ fileList });
  }

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
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleUpload}
              onRemove={this.handleRemove}
              beforeUpload={(file) => {
                this.setState(prev => ({
                  fileList: [...prev.fileList, file]
                }));
                return false;
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
            <Button
              onClick={async () => {
                this.setState({ redirect: "/" });
              }}
            >
              Cancel
            </Button>
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
