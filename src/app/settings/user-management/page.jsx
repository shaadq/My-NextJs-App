"use client";
import CustomSpinner from "@/components/common/custom-spinner/CustomSpinner";
import { formatDate } from "@/components/utils/utils";
import { userRoles } from "@/enum-list/enumList";
import { myServices } from "@/service/json-service/service";
import { userProfilesService } from "@/service/json-service/userProfilesService";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineClose } from "react-icons/md";
import AddEditUser from "./AddEditUser";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import UserProfile from "./UserProfile";
import "./Users.scss";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState({ users: false, userProfile: false });
  const [drawerShow, setDrawerShow] = useState({ show: false, data: {} });
  const [userInfo, setUserInfo] = useState({ show: false, id: null, data: {} });
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    name: null,
  });

  const handleEditClick = (record) => {
    setDrawerShow({ show: true, data: record });
  };

  const handleNameClick = async (record) => {
    setUserInfo((prev) => ({ ...prev, show: true, id: record.id }));
    setLoading((prev) => ({ ...prev, userProfile: true }));
    try {
      const data = await userProfilesService.getUserProfileByUserId(record.id);
      console.log(data);
      setUserInfo((prev) => ({ ...prev, data: data }));
    } catch (error) {
    } finally {
      setLoading((prev) => ({ ...prev, userProfile: false }));
    }
  };

  const columns = [
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "name",
      width: 160,
      render: (item) => formatDate(item),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (item, record) => (
        <div
          className="cursor-pointer text-decoration-underline fw-semibold text-success text-wrap"
          onClick={() => handleNameClick(record)}
        >
          {item}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
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
        const name = record.name;
        return (
          <div className="d-flex align-itemc-center">
            <div
              onClick={() => {
                setUserInfo((prev) => ({ ...prev, show: false }));
                handleEditClick(record);
              }}
            >
              <FaRegEdit className="fs-5 text-secondary cursor-pointer" />
            </div>
            <div
              onClick={() => {
                setUserInfo((prev) => ({ ...prev, show: false }));
                setConfirmDelete({ show: true, name: name, id: record.id });
              }}
            >
              <MdDeleteOutline className="fs-4 ms-2 text-secondary cursor-pointer" />
            </div>
          </div>
        );
      },
    },
  ];

  const fetchUsers = async () => {
    setLoading((prev) => ({ ...prev, users: true }));
    try {
      const data = await myServices.fetchAllUsers();
      setUsers(data);
    } catch (error) {
    } finally {
      setLoading((prev) => ({ ...prev, users: false }));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <React.Fragment>
      {loading.users ? (
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
          <div className="users-wrapper">
            <div
              className={`users-left-wrapper ${
                userInfo.show ? "shrinked" : ""
              }`}
            >
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
                  rowExpandable: (record) =>
                    record.university !== "Not Expandable",
                }}
                // pagination={{ pageSize: 20 }}
                // scroll={{ y: 100 * 5 }}
                scroll={{ x: "max-content" }}
              />
            </div>
            <div
              className={`users-right-wrapper ps-3 h-100 ${
                userInfo.show ? "info-show" : ""
              }`}
            >
              <div className={` py-3 px-2 border rounded-3 bg-light h-100 `}>
                <div className="user-profile-wrapper h-100 px-3 py-">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 text-success">
                      {/* User Info */}
                      {loading.userProfile ? "" : userInfo.data?.users?.name}
                    </h5>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setUserInfo((prev) => ({ ...prev, show: false }));
                      }}
                      style={{ marginRight: "-8px" }}
                    >
                      <MdOutlineClose className="fs-5" />
                    </div>
                  </div>
                  {loading.userProfile ? (
                    <CustomSpinner />
                  ) : (
                    <UserProfile userInfo={userInfo} />
                  )}
                </div>
              </div>
            </div>
          </div>
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
