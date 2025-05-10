"use client";
import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Sider } = Layout;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: Array.from({ length: 4 }).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);
const App = ({children}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Layout>
            <Header style={{ display: "flex", alignItems: "center" }}>
              <div className="demo-logo" />
                <div
                style={{
                  width: 120,
                  height: 31,
                  background: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "6px",
                  marginRight: "16px",
                }}
                />
            </Header>
            <Layout>
              <Sider width={200} style={{ background: colorBgContainer }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%", borderRight: 0 }}
                  items={items2}
                />
              </Sider>
              <Layout style={{ padding: "0 24px 24px" }}>
                <Breadcrumb
                  items={[
                    { title: "Home" },
                    { title: "List" },
                    { title: "App" },
                  ]}
                  style={{ margin: "16px 0" }}
                />
                <Content
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  {children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
};
export default App;
