"use client";
import { userRoles } from "@/enum-list/enumList";
import { myServices } from "@/service/json-service/service";
import { Button, Drawer, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const AddEditUser = ({ show, data, onClose, setUsers }) => {
  const initialValue = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    address: "",
  };
  const [formData, setFormData] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (data) {
        const response = await myServices.updateUser(data.id, formData);
      } else {
        const response = await myServices.addUser(formData);
      }
    } catch (error) {
    } finally {
      onClose();
      const data = await myServices.fetchAllUsers();
      setUsers(data);
      setLoading(false);
      toast.info(`${data ? "User info updated!" : "New user added!"}`);
      setFormData(initialValue);
    }
  };

  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        password: data.password,
        address: data.address,
        role: data.role,
      });
    } else {
      setFormData(initialValue);
    }
  }, [data]);

  const handleClose = () => {
    onClose();
    setFormData(initialValue);
  };

  return (
    <Drawer
      title={`${data ? "Edit User" : "Add User"}`}
      onClose={handleClose}
      open={show}
      width={500}
      extra={
        <Space>
          <Button onClick={handleClose} variant="text">
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="primary" disabled={loading}>
            <span>{data ? "Update" : "Add"}</span>
            {loading ? <Spinner size="sm" /> : null}
          </Button>
        </Space>
      }
    >
      <Row md={2} className="w-100">
        <Col>
          <div className="mb-3">
            <label htmlFor="" className="form-label fw-semibold">
              First Name
            </label>
            <Input
              type="text"
              placeholder="First Name"
              value={formData?.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              disabled={loading}
            />
          </div>
        </Col>
        <Col>
          <div className="mb-3">
            <label htmlFor="" className="form-label fw-semibold">
              Last Name
            </label>
            <Input
              type="text"
              placeholder="Last Name"
              value={formData?.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              disabled={loading}
            />
          </div>
        </Col>
        <Col>
          <div className="mb-3">
            <label htmlFor="" className="form-label fw-semibold">
              Email
            </label>
            <Input
              type="text"
              placeholder="Email"
              value={formData?.email}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={loading}
            />
          </div>
        </Col>
        <Col>
          <div className="mb-3">
            <label htmlFor="" className="form-label fw-semibold">
              Address
            </label>
            <Input
              type="text"
              placeholder="Address"
              value={formData?.address}
              onChange={(e) => handleChange("address", e.target.value)}
              disabled={loading}
            />
          </div>
        </Col>
        <Col>
          <div className="mb-3">
            <label htmlFor="" className="form-label fw-semibold">
              Username
            </label>
            <Input
              type="text"
              placeholder="Username"
              value={formData?.username}
              onChange={(e) => handleChange("username", e.target.value)}
              disabled={loading}
            />
          </div>
        </Col>
        <Col>
          <div className="mb-3">
            <label htmlFor="" className="form-label fw-semibold">
              Password
            </label>
            <Input
              type="text"
              placeholder="Password"
              value={formData?.password}
              onChange={(e) => handleChange("password", e.target.value)}
              disabled={loading}
            />
          </div>
        </Col>
        <Col>
          <div className="mb-3">
            <label htmlFor="" className="form-label fw-semibold">
              Role
            </label>
            <Select
              className="w-100"
              placeholder="Select a person"
              optionFilterProp="label"
              value={userRoles?.roles[formData.role]?.text}
              onChange={(e) => {
                handleChange("role", e);
              }}
              options={userRoles.rolesDropdown}
              disabled={loading}
            />
          </div>
        </Col>
      </Row>
    </Drawer>
  );
};

export default AddEditUser;
