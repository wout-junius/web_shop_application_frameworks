import { Button, Table, Tag } from "antd";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Product } from "../../Entities/Product";
import { ITag } from "../../Entities/Tag";

export default function ProductTable({products, deleteItem}: { products: Product[], deleteItem: (id: number, type: string) => void }) {
  const ctx = useContext(AuthContext);

  return (
      <Table dataSource={products}
      >
        <Table.Column title="Name" dataIndex="name" />
        <Table.Column title="Description" dataIndex="description" />
        <Table.Column title="Price" dataIndex="price" />
        <Table.Column
          title="Tags"
          dataIndex="tags"
          render={(tags: ITag[]) => (
            <>
              {tags.map((tag) => (
                <Tag color="blue" key={tag.name}>
                  {tag.name}
                </Tag>
              ))}
            </>
          )}
        />
        <Table.Column
          title="Actions"
          render={(_: any, record: Product) => (
            <Button
              type="primary"
              onClick={() => deleteItem(record.id, "product")}
            >
              Delete
            </Button>
          )}
        />
      </Table>
  );
}
