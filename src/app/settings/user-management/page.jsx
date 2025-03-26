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
      render: (text, record) => (
        <div>{record.firstName + " " + record.lastName}</div>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
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
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (item) => {
        return <Badge bg={`${enumList.userRoles.badges[item]}`}>{item}</Badge>;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (item, record) => {
        return (
          <div className="d-flex ms-3" onClick={() => handleEditClick(record)}>
            <FaRegEdit className="fs-5 text-secondary cursor-pointer" />
          </div>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <Table columns={columns} dataSource={users} loading={loading} />
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
