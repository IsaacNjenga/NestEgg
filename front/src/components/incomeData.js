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
      <div style={{ maxWidth: 800, margin: "auto", padding: 16 }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          All your income entries
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
              size="small"
              style={{ marginBottom: 16 }}
              title={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: "10px 0px",
                  }}
                >
                  <div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Date: {format(new Date(entry.timestamp), "PPPP")}
                    </Text>
                  </div>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <Button
                      type="dashed"
                      icon={<PlusCircleOutlined />}
                      shape="circle"
                    />

                    <Popconfirm
                      title="Are you sure?"
                      description="This action cannot be undone!"
                      open={openDelete}
                      onConfirm={() => handleFieldDelete(entry._id)}
                      okButtonProps={{ loading: confirmLoading }}
                      onCancel={handleDeleteCancel}
                    >
                      <Button type="primary" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </div>
                </div>
              }
            >
              <List
                dataSource={entry.incomeSourceDetails}
                locale={{ emptyText: "No income sources" }}
                renderItem={(item) => (
                  <List.Item key={item._id} style={{ padding: "8px 0" }}>
                    <List.Item.Meta
                      title={
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          <div>
                            <Text strong>Source: {item.incomeSource}</Text>
                          </div>
                          <div style={{ display: "flex", gap: "5px" }}>
                            <Popover trigger="hover" title="Update this entry">
                              <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => viewEntry(item)}
                              />
                            </Popover>
                            <Popover trigger="hover" title="Delete this entry">
                              <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                  console.log(`clicked on ${item._id}`);
                                }}
                              />
                            </Popover>
                          </div>
                        </div>
                      }
                      description={
                        <>
                          <Text>
                            Amount: KES. {item.amount.toLocaleString()}
                          </Text>
                          <br />
                          <Text>
                            Date of Reception:{" "}
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
