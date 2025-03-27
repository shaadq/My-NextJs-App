import { myServices } from "@/service/json-service/service";
import { Button, message, Modal } from "antd";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const ConfirmDeleteModal = ({ show, name, id, setUsers, onClose }) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      console.log("modal:", id);
      await myServices.deleteUser(id);
    } catch (error) {
    } finally {
      onClose();
      const data = await myServices.fetchAllUsers();
      setUsers(data);
      setLoading(false);
      toast.error(`${name} deleted!`);
    }
  };

  return (
    <Modal
      centered
      width={450}
      title="Confirm Delete User"
      open={show}
      onCancel={onClose}
      footer={[
        <div className="d-flex align-items-center justify-content-center">
          <Button className="me-2" key="cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button key="delete" type="primary" danger onClick={handleDelete}>
            {loading && <Spinner size="sm" />}
            Delete User
          </Button>
        </div>,
      ]}
      styles={{
        header: { textAlign: "center" }, // Centers the title
      }}
    >
      <p className="text-center my-4">
        Are you sure you want to delete {name}?
      </p>
    </Modal>
  );
};

export default ConfirmDeleteModal;
