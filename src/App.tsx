import React from "react";
import "./App.css";
import "antd/dist/antd.min.css";

import {Layout } from "antd";
import MyRouter from "./MyRouter";
import AppHeader from "./components/AppHeader";
import CartDrawer from "./components/CartDrawer";

const { Content, Footer } = Layout;

export default function App() {
  const [cartVisible, setCartVisible] = React.useState(false);
  const openCart = () => {
    setCartVisible(true);
  }
  const closeCart = () => {
    setCartVisible(false);
  }
  return (
    <Layout className="layout">
      <AppHeader openCart={openCart} />
      <Content style={{ padding: "0 50px", margin: "16px 0" }}>
        <CartDrawer visible={cartVisible} onClose={closeCart} />
        <MyRouter />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}


