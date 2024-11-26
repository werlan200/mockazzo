import "./App.css";
import Sidebar from "./components/Sidebar";
import { CollectionProvider } from "./context/CollectionContext";

import React from "react";
import { Flex, Layout } from "antd";
import RouteForm from "./components/RouteForm";

const { Header, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#1677ff",
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  height: "100vh",
};

function App() {
  return (
    <CollectionProvider>
      <Flex>
        <Layout style={layoutStyle}>
          <Sider width="25%" style={siderStyle}>
            <Sidebar />
          </Sider>
          <Layout>
            <Header style={headerStyle}>Header</Header>
            <Content style={contentStyle}>
              <RouteForm />
            </Content>
          </Layout>
        </Layout>
      </Flex>
    </CollectionProvider>
  );
}

export default App;
