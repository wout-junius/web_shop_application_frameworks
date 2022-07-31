import { Button, Table, Tag } from "antd";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ISale } from "../../Entities/ISale";
import { Product } from "../../Entities/Product";
import { ITag } from "../../Entities/Tag";

export default function SaleTable({sales}: { sales: ISale[] }) {
  return (
      <Table dataSource={sales}
      >
        <Table.Column title="Date" dataIndex="date" />
        <Table.Column
          title="Products"
          dataIndex="products"
          render={(products: Product[]) => (
            <>
              {products.map((products) => (
                <Tag color="blue" key={products.name}>
                  {products.name}
                </Tag>
              ))}
            </>
          )}
        />
        <Table.Column
          title="Total"
          render={(_: any, record: ISale) => {
            let total = 0;
            record.products.forEach((product) => {
              total += product.price;
            }
            );
            return total;
          }}
        />
      </Table>
  );
}
