import React, { useContext } from "react";
import "./App.css";
import "antd/dist/antd.min.css";

import { Button, Dropdown, Layout, Menu } from "antd";
import MyRouter from "./MyRouter";
import { ApiOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const { Header, Content, Footer } = Layout;

export default function App() {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const menuPressed = (item: any) => {
    if (item.key === "Logout") {
      ctx.logout();
      navigate("/");
    } else {
      navigate(item.key);
    }
  };
  return (
    <Layout className="layout">
      <Header
        style={{
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1em",
        }}
      >
        <a onClick={() => navigate("/")}>
          <h1
            style={{
              width: "100%",
              color: "white",
            }}
          >
            Webshop of all your needs
          </h1>
        </a>
        {ctx.user ? (
          <Dropdown overlay={<Menu onClick={menuPressed} items={items} />}>
            <Button type="link" onClick={(e) => e.preventDefault()}>
              <UserOutlined
                style={{
                  fontSize: "1.5em",
                  marginRight: "0.5em",
                  color: "#fff",
                }}
              />
            </Button>
          </Dropdown>
        ) : (
          loginMenu
        )}
      </Header>
      <Content style={{ padding: "0 50px", margin: "16px 0" }}>
        <MyRouter />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}
const items = [
  {
    label: "Admin",
    key: "/admin",
    icon: <UserOutlined />,
  },
  {
    label: "Product management",
    key: "/api/management",
    icon: <ApiOutlined />,
  },
  {
    label: "Logout",
    key: "Logout",
    icon: <ApiOutlined />,
  },
];

const loginMenu = (
  <div>
    <NavLink
      to="/login"
      style={{
        marginRight: "0.5em",
      }}
    >
      <Button type="primary">Login</Button>
    </NavLink>
    <NavLink to="/register">
      <Button type="primary">Register</Button>
    </NavLink>
  </div>
);
