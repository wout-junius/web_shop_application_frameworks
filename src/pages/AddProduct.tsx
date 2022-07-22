import {
  ShopOutlined,
  EuroCircleOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Alert } from "antd";
import React, { useState } from "react";

type Props = {};

export default function AddProduct({}: Props) {
  let formValue: any = {};
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = (values: any) => {};
  return (
    <div className="background">
      <div
        className="content"
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div>
          <h1>Add product</h1>
          {error(errorMessage)}
          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="productName"
              rules={[
                { required: true, message: "Please input the product name!" },
              ]}
            >
              <Input
                prefix={<ShopOutlined className="site-form-item-icon" />}
                placeholder="Product name"
              />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Please put a description!" }]}
            >
              <Input
                prefix={<FormOutlined className="site-form-item-icon" />}
                type="textbox"
                placeholder="Description"
              />
            </Form.Item>
            <Form.Item
              name="price"
              rules={[
                { required: true, message: "Please input the price!" },
                { type: "number", message: "Please input a valid price!" },
              ]}
            >
              <Input
                prefix={<EuroCircleOutlined className="site-form-item-icon" />}
                placeholder="Price"
                type="number"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{
                  marginRight: "0.5em",
                }}
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

const error = (error: string | undefined) => {
  if (error) {
    return (
      <Alert
        message={error}
        type="error"
        showIcon
        style={{
          marginBottom: "1em",
        }}
      />
    );
  }
};
