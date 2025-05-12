import { Modal } from "antd";
import React from "react";
import UpdateIncome from "../pages/updateIncome";

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
        <UpdateIncome modalContent={modalContent} />
      </Modal>
    </>
  );
}

export default UpdateIncomeModal;
