// src/app/layout.js
"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout, Menu, theme } from "antd";
import { items2 } from "@/statics/menuItens";
import "./globals.css";

const { Header, Content, Sider } = Layout;

const RootLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <html lang="pt-BR">
      <body>
        <AntdRegistry>
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              collapsible
              style={{ position: 'fixed', height: '100vh', left: 0, top: 0, bottom: 0 }}
            >
              <div style={{
                height: 32,
                margin: 16,
                background: "rgba(255, 255, 255, 0.3)",
                borderRadius: 6
              }} />
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["home"]}
                items={items2}
              />
            </Sider>

            <Layout style={{ marginLeft: 200 }}> {/* margem para compensar o Sider fixo */}
              <Header style={{ padding: 0, background: colorBgContainer }} />
              <Content style={{ margin: '16px' }}>
                <div
                  style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                  }}
                >
                  {children}
                </div>
              </Content>
            </Layout>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
