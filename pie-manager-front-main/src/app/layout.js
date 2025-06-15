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
        
                  {children}

        </AntdRegistry>
      </body>
    </html>
  );
};
export default App;
