"use client";
import { enumList } from "@/enum-list/enumList";
import { myServices } from "@/service/json-service/service";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import AddEditUser from "./AddEditUser";
import { FaRegEdit } from "react-icons/fa";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerShow, setDrawerShow] = useState({ show: false, data: {} });

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const data = await myServices.fetchAllUsers();
      setUsers(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (record) => {
    setDrawerShow((prev) => ({ ...prev, show: true, data: record }));
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
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (text) => <div>{text.name}</div>,
    },
    {
      title: "Date of Birth",
      dataIndex: "birthDate",
      key: "birthDate",
      width: 150,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 100,
      render: (item) => {
        return <Badge bg={`${enumList.userRoles.badges[item]}`}>{item}</Badge>;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 100,
      render: (item, record) => {
        return (
          <div className="d-flex ms-3" onClick={() => handleEditClick(record)}>
            <FaRegEdit className="fs-5 text-secondary cursor-pointer" />
          </div>
        );
      },
    },
  ];

  console.log(users);

  return (
    <React.Fragment>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={users}
        expandable={{
          expandedRowRender: (record) => (
            <p className="mb-0 d-flex">
              <div className="fw-semibold me-1">University :</div>
              <div>{record?.university}</div>
            </p>
          ),
          rowExpandable: (record) => record.university !== "Not Expandable",
        }}
        // pagination={{ pageSize: 20 }}
        scroll={{ y: 100 * 5 }}
        loading={loading}
      />
      <AddEditUser
        show={drawerShow.show}
        data={drawerShow.data}
        onClose={() => {
          setDrawerShow((prev) => ({ ...prev, show: false }));
        }}
        fetchAllUsers={() => fetchAllUsers()}
      />
    </React.Fragment>
  );
}
