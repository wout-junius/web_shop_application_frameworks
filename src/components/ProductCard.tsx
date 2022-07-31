import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Tag } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { Product } from "../Entities/Product";

export default function ProductCard({
  product,
  loading,
}: {
  product: Product;
  loading: boolean;
}) {
  const cartCtx = useContext(CartContext);
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Card
      key={Math.random()}
      style={{
        margin: "1em",
      }}
      loading={loading}
    >
      <Meta
        title={product.name}
        style={{
          marginBottom: ".5rem",
        }}
      />
      {product.tags?.map((tag) => (
        <Tag key={tag.name}>{tag.name}</Tag>
      ))}
      <br />
      <b>Beschrijving:</b> {product.description} <br />
      <b>Prijs:</b> {product.price} <br />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          if (ctx.user) {
            cartCtx.addProduct(product);
          } else navigate("/login");
        }}
      >
        Toevoegen
      </Button>
    </Card>
  );
}
