import React, { useContext, useState } from "react";
// @ant-design
import { Button, Col, Row, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
// hooks
import useHideMenu from "../hooks/useHideMenu";
// context
import { SocketContext } from "../context/SocketContext";

// ----------------------------------------------------------------------

const { Title, Text } = Typography;

// ----------------------------------------------------------------------

const CreateTicket = () => {
  useHideMenu(true);

  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);

  const nextTicket = () => {
    socket.emit("request-ticket", null, (ticket) => {
      setTicket(ticket);
    });
  };

  return (
    <>
      <Row>
        <Col span={14} offset={6} align="center">
          <Title level={3}>Press the button to create a new ticket</Title>

          <Button
            shape="round"
            type="primary"
            icon={<DownloadOutlined />}
            size="large"
            onClick={nextTicket}
          >
            Create Ticket
          </Button>
        </Col>
      </Row>

      {ticket && (
        <Row style={{ marginTop: 100 }}>
          <Col span={14} offset={6} align="center">
            <Text level={2}>Your number</Text>
            <br />
            <Text type="success" style={{ fontSize: 55 }}>
              {ticket?.number}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CreateTicket;
