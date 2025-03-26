"use client";
import { enumList } from "@/enum-list/enumList";
import { myServices } from "@/service/json-service/service";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    fetchAllUsers();
  }, []);

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
      render: (item, record) => {
        return <Badge bg={`${enumList.userRoles.badges[item]}`}>{item}</Badge>;
      },
    },
  ];

  return (
    <React.Fragment>
      <Table columns={columns} dataSource={users} loading={loading} />
    </React.Fragment>
  );
}
