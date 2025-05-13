import { Modal } from "antd";
import React from "react";
import UpdateIncome from "../pages/updateIncome";

function AddIncomeModal({
  loading,
  openAddModal,
  setOpenAddModal,
  modalContent,
}) {
  return (
    <>
      <Modal
        footer={null}
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        confirmLoading={loading}
        width={850}
        style={{ maxWidth: "95vw" }}
      >
        <UpdateIncome modalContent={modalContent} setOpenAddModal={setOpenAddModal} />
      </Modal>
    </>
  );
}

export default AddIncomeModal;
