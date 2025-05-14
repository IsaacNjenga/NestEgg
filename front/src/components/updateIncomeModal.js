import { Modal } from "antd";
import React from "react";
import UpdateIncomeSource from "../pages/updateIncomeSource";

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
        <UpdateIncomeSource
          modalContent={modalContent}
          setOpenUpdateModal={setOpenUpdateModal}
        />
      </Modal>
    </>
  );
}

export default UpdateIncomeModal;
