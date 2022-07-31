import { DeleteOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer, Row } from "antd";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function CartDrawer({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const cartCtx = useContext(CartContext);
  const AuthCtx = useContext(AuthContext);

  const saveSale = () => {
    fetch(`/sale/save/${AuthCtx.user?.sub}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: cartCtx.cart,
      }),
    }).then(() => {
      cartCtx.clearCart();
      onClose();
    });
  }

  return (
    <Drawer
      title="Shopping cart"
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      {cartCtx.cart.map((product, i) => (
        <div key={i}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </div>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                cartCtx.removeProduct(product);
              }}
            >
              Remove
            </Button>
          </div>
          <Divider />
        </div>
      ))}

      <Button
        type="primary"
        onClick={saveSale}
      >
        Checkout
      </Button>
    </Drawer>
  );
}
