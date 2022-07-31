import { DeleteOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer, Row } from "antd";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartDrawer({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const ctx = useContext(CartContext);
  return (
    <Drawer
      title="Shopping cart"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      {ctx.cart.map((product, i) => (
        <div key={i}>
          <div style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}>
            <div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </div>
            <Button danger icon={<DeleteOutlined />} onClick={() => {
              ctx.removeProduct(product);
            }}>Remove</Button>
          </div>
          <Divider />
        </div>
      ))}

      <Button type="primary">Checkout</Button>
    </Drawer>
  );
}
