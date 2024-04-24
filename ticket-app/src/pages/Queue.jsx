import React, { useContext, useEffect, useState } from "react";
// @ant-design
import { Card, Col, Divider, List, Row, Tag, Typography } from "antd";
// hooks
import useHideMenu from "../hooks/useHideMenu";
// context
import { SocketContext } from "../context/SocketContext";
// helpers
import { getLatest } from "../helpers/getLatest";

// ----------------------------------------------------------------------

const { Title, Text } = Typography;

// const data = [
//   {
//     ticketNo: 33,
//     escritorio: 3,
//     agente: "Fernando Herrera",
//   },
//   {
//     ticketNo: 34,
//     escritorio: 4,
//     agente: "Melissa Flores",
//   },
//   {
//     ticketNo: 35,
//     escritorio: 5,
//     agente: "Carlos Castro",
//   },
//   {
//     ticketNo: 36,
//     escritorio: 3,
//     agente: "Fernando Herrera",
//   },
//   {
//     ticketNo: 37,
//     escritorio: 3,
//     agente: "Fernando Herrera",
//   },
//   {
//     ticketNo: 38,
//     escritorio: 2,
//     agente: "Melissa Flores",
//   },
//   {
//     ticketNo: 39,
//     escritorio: 5,
//     agente: "Carlos Castro",
//   },
// ];

// ----------------------------------------------------------------------

const Queue = () => {
  useHideMenu(true);

  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    socket.on("current-tickets", (tickets) => {
      console.log("🚀 ~ socket.on ~ tickets:", tickets);
      setTickets(tickets);
    });

    return () => socket.off("current-tickets");
  }, [socket]);

  useEffect(() => {
    getLatest().then(setTickets);
  }, []);

  return (
    <>
      <Title level={1}>Attending to ticket</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color="volcano">{item.username}</Tag>,
                    <Tag color="magenta">Desktop: {item.desktop}</Tag>,
                  ]}
                >
                  <Title>Ticket: {item.number}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider>History</Divider>

          <List
            dataSource={tickets.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket: ${item.number}`}
                  description={
                    <>
                      <Text type="secondary">On desktop: </Text>
                      <Tag color="magenta">{item.desktop}</Tag>
                      <Text type="secondary">Agent: </Text>
                      <Tag color="volcano">{item.username}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default Queue;
