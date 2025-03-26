"use client";
import { myServices } from "@/service/json-service/service";
import { Button, Drawer, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const AddEditUser = ({ show, data, onClose, fetchAllUsers }) => {
  const initialValue = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  };
  const [formData, setFormData] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await myServices.updateUser(data.id, formData);
    } catch (error) {
    } finally {
      toast.info("User Info Updated!");
      await fetchAllUsers();
      setLoading(false);
      onClose();
    }
  };

  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: data.password,
        email: data.email,
      });
    }
  }, [data]);

  return (
    <Drawer
      title="Edit User Info"
      onClose={onClose}
      open={show}
      width={500}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="primary" disabled={loading}>
            <span>Submit</span>
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
            <input
              type="text"
              className="form-control"
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
            <input
              type="text"
              className="form-control"
              value={formData?.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              disabled={loading}
            />
          </div>
        </Col>
        <Col>
          <div className="mb-3">
            <label htmlFor="" className="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              className="form-control"
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
            <input
              type="text"
              className="form-control"
              value={formData?.password}
              onChange={(e) => handleChange("password", e.target.value)}
              disabled={loading}
            />
          </div>
        </Col>
        <Col md={12}>
          <div className="mb-3">
            <label htmlFor="" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              value={formData?.email}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={loading}
            />
          </div>
        </Col>
      </Row>
    </Drawer>
  );
};

export default AddEditUser;
