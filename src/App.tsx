import "./App.css";
import Sidebar from "./components/Sidebar";
import MockazzoHeader from "./components/Header";
import { CollectionProvider } from "./context/CollectionContext";

import React, { useEffect } from "react";
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
  const send = async () => {
    try {
      const response = await fetch("https://example.com/api/endpoint1");
      const data = await response.json();
      console.log("datasal", data);
    } catch (error) {
      console.error;
    }
  };

  useEffect(() => {
    send();
  }, []);

  return (
    <CollectionProvider>
      <Flex>
        <Layout style={layoutStyle}>
          <Sider width="25%" style={siderStyle}>
            <Sidebar />
          </Sider>
          <Layout>
            <Header style={headerStyle}>
              <MockazzoHeader />
            </Header>
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
