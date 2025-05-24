"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout, theme } from "antd";
import '../styles/globals.css';

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
