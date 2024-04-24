import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// @ant-design
import { Button, Col, Row, Typography, Divider } from "antd";
import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
// hooks
import useHideMenu from "../hooks/useHideMenu";
// helpers
import { getUserStorage } from "../helpers/getUserStorage";
// context
import { SocketContext } from "../context/SocketContext";

// ----------------------------------------------------------------------

const { Title, Text } = Typography;

// ----------------------------------------------------------------------

function Desktop() {
  const navigate = useNavigate();
  useHideMenu(false);
  const [user] = useState(getUserStorage());
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);

  const exit = () => {
    localStorage.clear();
    navigate("/sign-in", { replace: true });
  };

  const nextTicket = () => {
    socket.emit("next-ticket-2-work", user, (ticket) => {
      setTicket(ticket);
    });
  };

  if (!user.username || !user.desktop) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div>
      <Row>
        <Col span={20}>
          <Title level={2}>{user.username}</Title>
          <Text>You are working at the desk: </Text>
          <Text type="success">{user.desktop}</Text>
        </Col>
        <Col span={4} align="right">
          <Button shape="round" danger onClick={exit}>
            <CloseCircleOutlined />
            Exit
          </Button>
        </Col>
      </Row>

      <Divider />

      {ticket && (
        <Row>
          <Col>
            <Text>Is attending to ticket number: </Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {ticket.number}
            </Text>
          </Col>
        </Row>
      )}

      <Row>
        <Col offset={18} span={6} align="right">
          <Button shape="round" type="primary" onClick={nextTicket}>
            <RightOutlined />
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Desktop;
