"use client";
import CustomSpinner from "@/components/common/custom-spinner/CustomSpinner";
import { enumList } from "@/enum-list/enumList";
import { myServices } from "@/service/json-service/service";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import AddEditUser from "./AddEditUser";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerShow, setDrawerShow] = useState({ show: false, data: {} });

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
      width: 250,
    },
    // {
    //   title: "Company",
    //   dataIndex: "company",
    //   key: "company",
    //   render: (text) => <div>{text?.name}</div>,
    //   width: 150,
    // },
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
        <Table
          rowKey="id"
          columns={columns}
          dataSource={users}
          expandable={{
            expandedRowRender: (record) => (
              <p className="mb-0 d-flex">
                <span className="fw-semibold me-1">University :</span>
                <span>{record?.university}</span>
              </p>
            ),
            rowExpandable: (record) => record.university !== "Not Expandable",
          }}
          // pagination={{ pageSize: 20 }}
          scroll={{ y: 100 * 5 }}
          loading={loading}
        />
      )}

      <AddEditUser
        show={drawerShow.show}
        data={drawerShow.data}
        onClose={() => {
          setDrawerShow((prev) => ({ ...prev, show: false }));
        }}
        fetchAllUsers={() => fetchUsers()}
      />
    </React.Fragment>
  );
}
