import { TagOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import React from "react";

export default function AddTagForm({
  onFinish,
}: {
  onFinish: (values: any) => void;
}) {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      initialValues={{ remember: true }}
      onFinish={(values) => {
        onFinish(values);
        form.resetFields();
      }}
    >
      <Form.Item
        name="tagName"
        rules={[{ required: true, message: "Please input the product name!" }]}
      >
        <Input
          prefix={<TagOutlined className="site-form-item-icon" />}
          placeholder="Product name"
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
  );
}
