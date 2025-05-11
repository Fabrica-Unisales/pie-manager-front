"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { items2 } from "@/statics/menuItens";

const { Header, Content, Sider } = Layout;


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
                  onClick={(e) => {
                    console.log(e);
                  }
                  }
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
