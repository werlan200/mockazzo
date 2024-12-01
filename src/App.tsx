import "./App.css";
import Sidebar from "./components/Sidebar";
import MockazzoHeader from "./components/Header";
import { CollectionProvider } from "./context/CollectionContext";

import { Flex, Layout } from "antd";
import RouteForm from "./components/RouteForm";

const { Header, Content } = Layout;

function App() {
  return (
    <CollectionProvider>
      <Flex>
        <Layout className="layout">
          <div className="sider">
            <Sidebar />
          </div>
          <Layout>
            <Header className="header">
              <MockazzoHeader />
            </Header>
            <Content className="content">
              <RouteForm />
            </Content>
          </Layout>
        </Layout>
      </Flex>
    </CollectionProvider>
  );
}

export default App;
