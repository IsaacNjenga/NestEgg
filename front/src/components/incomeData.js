import React, { useState } from "react";
import { format } from "date-fns";
import {
  Card,
  List,
  Typography,
  Spin,
  Space,
  Button,
  Popover,
  Popconfirm,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";
import UpdateIncomeModal from "./updateIncomeModal";

const { Title, Text } = Typography;

const cardStyle = {
  marginBottom: 24,
  borderRadius: 12,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
  fontFamily: "Roboto, sans-serif",
};

const headerStyle = {
  fontFamily: "Raleway, sans-serif",
  textAlign: "center",
  marginBottom: 32,
};

const pageStyle = {
  maxWidth: 800,
  margin: "auto",
  padding: 24,
  fontFamily: "Roboto, sans-serif",
};

function IncomeData({ allIncomeData, allIncomeLoading, refreshKey }) {
  const [openDelete, setOpenDelete] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleFieldDelete = async (id) => {
    // console.log(id);
    setConfirmLoading(true);
    try {
      await axios.delete(`income/delete-income/${id}`);
      Swal.fire({
        icon: "success",
        title: "Deleted",
      });
      refreshKey();
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "An unexpected error occurred. Please try again later.";

      Swal.fire({
        icon: "warning",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    //message.error("Canceled");
    setOpenDelete(null);
  };

  const viewEntry = (item) => {
    setOpenUpdateModal(true);
    setLoading(true);
    setModalContent(item);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  return (
    <>
      <div style={pageStyle}>
        <Title level={3} style={headerStyle}>
          All Your Income Entries
        </Title>

        {allIncomeLoading ? (
          <Space
            direction="vertical"
            style={{ width: "100%", textAlign: "center" }}
          >
            <Spin size="large" />
            <Text>Loading...</Text>
          </Space>
        ) : (
          allIncomeData.map((entry) => (
            <Card
              key={entry._id}
              size="default"
              title={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    {format(new Date(entry.timestamp), "PPPP")}
                  </Text>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button
                      type="dashed"
                      icon={<PlusCircleOutlined />}
                      shape="circle"
                      title="Add Income"
                    />
                    <Popconfirm
                      title="Are you sure?"
                      description="This will delete all sources under this income entry."
                      onConfirm={() => handleFieldDelete(entry._id)}
                      okButtonProps={{ loading: confirmLoading }}
                      onCancel={handleDeleteCancel}
                    >
                      <Button type="primary" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </div>
                </div>
              }
              style={cardStyle}
            >
              <List
                dataSource={entry.incomeSourceDetails}
                locale={{ emptyText: "No income sources found." }}
                renderItem={(item) => (
                  <List.Item key={item._id} style={{ padding: "10px 0" }}>
                    <List.Item.Meta
                      title={
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Text strong style={{ fontSize: 16 }}>
                            Source: {item.incomeSource}
                          </Text>
                          <div style={{ display: "flex", gap: 8 }}>
                            <Popover title="Edit Entry">
                              <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => viewEntry(item)}
                              />
                            </Popover>
                            <Popover title="Delete Entry">
                              <Button
                                icon={<DeleteOutlined />}
                                danger
                                onClick={() =>
                                  console.log(`clicked on ${item._id}`)
                                }
                              />
                            </Popover>
                          </div>
                        </div>
                      }
                      description={
                        <>
                          <Text>
                            Amount:{" "}
                            <strong>KES. {item.amount.toLocaleString()}</strong>
                          </Text>
                          <br />
                          <Text>
                            Date Received:{" "}
                            {format(new Date(item.dateOfReceipt), "PPPP")}
                          </Text>
                          <br />
                          <Text>Frequency: {item.frequency}</Text>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          ))
        )}
      </div>
      <UpdateIncomeModal
        loading={loading}
        openUpdateModal={openUpdateModal}
        setOpenUpdateModal={setOpenUpdateModal}
        modalContent={modalContent}
      />
    </>
  );
}

export default IncomeData;
