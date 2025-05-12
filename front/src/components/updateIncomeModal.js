import { Modal } from "antd";
import React from "react";

function UpdateIncomeModal({
  openUpdateModal,
  setOpenUpdateModal,
  loading,
  modalContent,
}) {
  return (
    <>
      <Modal
        footer={null}
        open={openUpdateModal}
        onCancel={() => setOpenUpdateModal(false)}
        confirmLoading={loading}
        width={850}
        style={{ maxWidth: "95vw" }}
      >
        <h1>UpdateIncomeModal</h1>
      </Modal>
    </>
  );
}

export default UpdateIncomeModal;
