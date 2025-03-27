"use client";
import CustomSpinner from "@/components/common/custom-spinner/CustomSpinner";
import { enumList, userRoles } from "@/enum-list/enumList";
import { myServices } from "@/service/json-service/service";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import AddEditUser from "./AddEditUser";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerShow, setDrawerShow] = useState({ show: false, data: {} });
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    name: null,
  });

  const handleEditClick = (record) => {
    setDrawerShow({ show: true, data: record });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "",
      key: "firstName",
      width: 150,
      render: (text, record) => (
        <div>{record.firstName + " " + record.lastName}</div>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 150,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 100,
      render: (item) => {
        return (
          <Badge bg={`${userRoles?.roles[item]?.class}`}>
            {userRoles?.roles[item]?.text}
          </Badge>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 70,
      render: (item, record) => {
        const name = record.firstName + " " + record.lastName;
        return (
          <div className="d-flex align-itemc-center">
            <div onClick={() => handleEditClick(record)}>
              <FaRegEdit className="fs-5 text-secondary cursor-pointer" />
            </div>
            <div
              onClick={() =>
                setConfirmDelete({ show: true, name: name, id: record.id })
              }
            >
              <MdDeleteOutline className="fs-4 ms-2 text-secondary cursor-pointer" />
            </div>
          </div>
        );
      },
    },
  ];

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await myServices.fetchAllUsers();
      setUsers(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <CustomSpinner />
      ) : (
        <React.Fragment>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">{users.length} Users</h5>
            <Button
              type="primary"
              onClick={() => setDrawerShow({ show: true })}
            >
              <AiOutlineUserAdd className="fs-5" />
              <span>Add User</span>
            </Button>
          </div>
          <Table
            rowKey="id"
            size="small"
            columns={columns}
            dataSource={users}
            expandable={{
              expandedRowRender: (record) => (
                <p className="mb-0 d-flex">
                  <span className="fw-semibold me-1">Password :</span>
                  <span>{record?.password}</span>
                </p>
              ),
              rowExpandable: (record) => record.university !== "Not Expandable",
            }}
            // pagination={{ pageSize: 20 }}
            // scroll={{ y: 100 * 5 }}
            loading={loading}
          />
        </React.Fragment>
      )}

      <AddEditUser
        show={drawerShow.show}
        data={drawerShow.data}
        onClose={() => {
          setDrawerShow({ show: false, data: null });
        }}
        setUsers={setUsers}
      />

      <ConfirmDeleteModal
        show={confirmDelete.show}
        name={confirmDelete.name}
        id={confirmDelete.id}
        setUsers={setUsers}
        onClose={() => {
          setConfirmDelete({ show: false });
        }}
      />
    </React.Fragment>
  );
}
