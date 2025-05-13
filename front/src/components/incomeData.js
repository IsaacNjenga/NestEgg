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
import AddIncomeModal from "./addIncomeModal";
import UseGetAllIncome from "../assets/hooks/useGetAllIncome";

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

function IncomeData() {
  const [openDelete, setOpenDelete] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const { allIncomeData, allIncomeLoading, refresh } = UseGetAllIncome();

  const handleFieldDelete = async (id) => {
    setConfirmLoading(true);
    try {
      const res = await axios.delete(`income/delete-income/${id}`);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted",
        });
        refresh();
      }
    } catch (error) {
      console.log(error);
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

  const handleEntryDelete = async (item, entry) => {
    setConfirmLoading(true);
    try {
      const detailId = item._id;
      const incomeId = entry._id;

      const res = await axios.delete(
        `income/delete-income-source/${detailId}/${incomeId}`
      );
      if (res.data.success) {
        Swal.fire({ icon: "success", title: "Deleted!" });
        refresh();
      }
    } catch (error) {
      console.log(error);
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

  const totalAmount = allIncomeData
    .flatMap((entry) => entry.incomeSourceDetails) // flatten into a single array
    .reduce((total, item) => {
      return total + (parseFloat(item.amount) || 0);
    }, 0);

  const addSource = (item) => {
    setOpenAddModal(true);
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
                    {format(new Date(entry?.createdAt), "PPPP")}
                  </Text>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button
                      type="dashed"
                      icon={<PlusCircleOutlined />}
                      shape="circle"
                      title="Add Another Income Source"
                      onClick={() => {
                        addSource(entry);
                      }}
                    />
                    <Popconfirm
                      title="Are you sure?"
                      description="This will delete all sources under this income entry."
                      onConfirm={() => handleFieldDelete(entry._id)}
                      okButtonProps={{ loading: confirmLoading }}
                      onCancel={handleDeleteCancel}
                      open={openDelete}
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
                              <Popconfirm
                                title="Are you sure?"
                                description="This will delete this entry permanently"
                                onConfirm={() => handleEntryDelete(item, entry)}
                                okButtonProps={{ loading: confirmLoading }}
                                onCancel={handleDeleteCancel}
                              >
                                <Button icon={<DeleteOutlined />} danger />
                              </Popconfirm>
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
        Total:{totalAmount}
      </div>
      <UpdateIncomeModal
        loading={loading}
        openUpdateModal={openUpdateModal}
        setOpenUpdateModal={setOpenUpdateModal}
        modalContent={modalContent}
      />
      <AddIncomeModal
        loading={loading}
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
        modalContent={modalContent}
      />
    </>
  );
}

export default IncomeData;
