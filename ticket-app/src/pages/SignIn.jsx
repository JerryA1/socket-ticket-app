import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// @ant-design
import { Button, Form, Input, InputNumber, Typography, Divider } from "antd";
import { SaveOutlined } from "@ant-design/icons";
// hooks
import useHideMenu from "../hooks/useHideMenu";
// helpers
import { getUserStorage } from "../helpers/getUserStorage";

// ----------------------------------------------------------------------

const { Title, Text } = Typography;

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

// ----------------------------------------------------------------------

const SignIn = () => {
  const navigate = useNavigate();
  const [user] = useState(getUserStorage());
  useHideMenu(false);

  const onFinish = ({ username, desktop }) => {
    localStorage.setItem("username", username);
    localStorage.setItem("desktop", desktop);
    navigate("/desktop");
  };

  if (user.username && user.desktop) {
    return <Navigate to="/desktop" replace />;
  }

  return (
    <>
      <Title level={2}>Sign In</Title>
      <Text>Write your username and desktop</Text>

      <Divider />

      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Desktop"
          name="desktop"
          rules={[
            {
              required: true,
              message: "Please input your desktop!",
            },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" shape="round">
            <SaveOutlined />
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignIn;
