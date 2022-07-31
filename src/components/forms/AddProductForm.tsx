import {
  ShopOutlined,
  FormOutlined,
  EuroCircleOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Select } from "antd";
import React from "react";
import { ITag } from "../../Entities/Tag";

const { Option } = Select;

export default function AddProductForm({
  onFinish,
  onTagsChange,
  tags,
}: {
  onFinish: (values: any) => void;
  onTagsChange: (tags: string[]) => void;
  tags: ITag[];
}) {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      name="register"
      initialValues={{ remember: true }}
      onFinish={(values) => {
        onFinish(values);
        form.resetFields();
      }}
    >
      <Form.Item
        name="productName"
        rules={[{ required: true, message: "Please input the product name!" }]}
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
        rules={[{ required: true, message: "Please input the price!" }]}
      >
        <Input
          prefix={<EuroCircleOutlined className="site-form-item-icon" />}
          placeholder="Price"
          type="number"
        />
      </Form.Item>

      <Form.Item>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder={
            <>
              <TagsOutlined />
              Select tags
            </>
          }
          onChange={onTagsChange}
        >
          {tags.map((tag) => (
            <Option key={tag.name} value={tag.name}>
              {" "}
              {tag.name}{" "}
            </Option>
          ))}
        </Select>
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
