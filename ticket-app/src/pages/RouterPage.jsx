import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// @ant-design
import { Layout, Menu, theme } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
// components
import SignIn from "./SignIn";
import Queue from "./Queue";
import CreateTicket from "./CreateTicket";
import Desktop from "./Desktop";
// context
import { UiContext } from "../context/UiContext";
//
const { Sider, Content } = Layout;

// ----------------------------------------------------------------------

const RouterPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { hideMenu } = useContext(UiContext);

  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Sider collapsedWidth={0} breakpoint="md" hidden={hideMenu}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: <Link to="/sign-in">Login</Link>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: <Link to="/queue">Queue</Link>,
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: <Link to="/create">Create ticket</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/sign-in" element={<SignIn />}></Route>
              <Route path="/queue" element={<Queue />}></Route>
              <Route path="/create" element={<CreateTicket />}></Route>
              <Route path="/desktop" element={<Desktop />}></Route>
              <Route path="*" element={<Navigate to="/sign-in" />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default RouterPage;
