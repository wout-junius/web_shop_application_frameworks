import React, { useContext } from "react";
import "./../App.css";
import "antd/dist/antd.min.css";

import { Button, Dropdown, Layout, Menu } from "antd";
import {
  ApiOutlined,
  AppstoreOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ItemType } from "antd/lib/menu/hooks/useItems";

const { Header } = Layout;
export default function AppHeader({openCart}: { openCart: () => void }) {
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
        <div>
          <Button type="link" onClick={openCart}>
          <ShoppingCartOutlined 
              style={{
                fontSize: "1.5em",
                marginRight: "0.5em",
                color: "#fff",
              }}
            />
          </Button>
          <Dropdown
            overlay={
              <Menu
                onClick={menuPressed}
                items={loadMenuItems(ctx.user.roles)}
              />
            }
          >
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
        </div>
      ) : (
        loginMenu
      )}
    </Header>
  );
}

const loadMenuItems = (roles: string[]) => {
  let items: ItemType[] = [];

  if (roles.includes("ROLE_ADMIN")) {
    items.push(
      {
        label: "Admin",
        key: "/admin",
        icon: <UserOutlined />,
      }
    );
  }
  items = [
    ...items,
    {
      label: "Orders",
      key: "/orders",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Logout",
      key: "Logout",
      icon: <LoginOutlined />,
    },
  ];

  return items;
};

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
