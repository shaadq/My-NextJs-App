import { jobStatus } from "@/enum-list/enumList";
import { userService } from "@/service/json-service/userService";
import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { Badge, Spinner } from "react-bootstrap";
import { FiAlertTriangle } from "react-icons/fi";
import { toast } from "react-toastify";

const ConfirmDeleteModal = ({ show, name, id, setUsers, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await userService.deleteUser(id, setError);
      toast.success(`${name} has been deleted!`);
      onClose(); // Close modal only when deletion is successful

      // Fetch updated users list
      const updatedUsers = await userService.fetchAllUsers();
      setUsers(updatedUsers);
    } catch (err) {
      // toast.error(`Failed to delete ${name}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setError(null);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      // width: 150,
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "location",
      // width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "role",
      width: 100,
      // fixed: "right",
      render: (item) => {
        return (
          <Badge bg={`${jobStatus?.status[item]?.class}`}>
            {jobStatus?.status[item]?.text}
          </Badge>
        );
      },
    },
  ];

  return (
    <Modal
      centered
      maskClosable={false}
      closable={false}
      width={error ? 500 : 450}
      title={error ? "Cannot Delete User" : "Confirm Delete User!"}
      open={show}
      onCancel={handleClose}
      footer={[
        <div
          key="footer"
          className="d-flex align-items-center justify-content-center"
        >
          <Button className="me-2" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="primary"
            danger
            onClick={handleDelete}
            disabled={loading || error}
          >
            {loading ? <Spinner size="sm" className="me-1" /> : null}
            Delete User
          </Button>
        </div>,
      ]}
      styles={{ header: { textAlign: "center" } }}
    >
      {error ? (
        <>
          <h6 className="text-danger fw-semibold d-flex align-items-center justify-content-center mb-4 mt-3 text-center">
            <FiAlertTriangle />
            <span className="ms-2">{name} has linked jobs:</span>
          </h6>
          <Table
            rowKey="id"
            size="small"
            columns={columns}
            dataSource={error.jobs}
            pagination={false}
            className="mb-4"
            // rowClassName={() => "error-row"} // Apply custom class
          />
        </>
      ) : (
        <p className="text-center my-4">
          Are you sure you want to delete{" "}
          <span className="fw-semibold">{name}</span>?
        </p>
      )}
    </Modal>
  );
};

export default ConfirmDeleteModal;
