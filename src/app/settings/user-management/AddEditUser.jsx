"use client";
import { userRoles } from "@/enum-list/enumList";
import { myServices } from "@/service/json-service/service";
import { Button, Drawer, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const AddEditUser = ({ show, data, onClose, setUsers }) => {
  const initialValue = {
    name: "",
    password: "",
    email: "",
    role: null,
  };
  const [formData, setFormData] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = "Please Enter Name";
    if (!formData.email?.trim()) {
      newErrors.email = "Please Enter Email ID";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "Invalid Email";
    }
    if (!formData.password?.trim())
      newErrors.password = "Please Enter Password";
    if (!formData.role?.trim()) newErrors.role = "Please Select Role";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // Stop execution if validation fails

    setLoading(true);
    try {
      if (data) {
        await myServices.updateUser(data.id, formData);
      } else {
        await myServices.addUser(formData, setErrors);
      }

      onClose();
      const users = await myServices.fetchAllUsers();
      setUsers(users);
      setFormData(initialValue);
      toast.info(`${data ? "User info updated!" : "New user added!"}`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Ensure loading state resets even if there's an error
    }
  };

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });
    } else {
      setFormData(initialValue);
    }
  }, [data]);

  const handleClose = () => {
    onClose();
    setErrors({});
    setFormData(initialValue);
  };

  return (
    <Drawer
      // maskClosable={false}
      closable={false} // Hide the close (X) icon
      title={`${data ? "Edit User" : "Add User"}`}
      onClose={handleClose}
      open={show}
      width={500}
      extra={
        <Space>
          <Button onClick={handleClose} variant="text" disabled={loading}>
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
              Name
            </label>
            <Input
              type="text"
              placeholder="First Name"
              status={`${errors.name ? "error" : ""}`}
              value={formData?.name}
              onChange={(e) => handleChange("name", e.target.value)}
              disabled={loading}
            />
            <div className="text-danger">{errors.name}</div>
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
              status={`${errors.email ? "error" : ""}`}
              value={formData?.email}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={loading}
            />
            <div className="text-danger">{errors.email}</div>
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
              status={`${errors.password ? "error" : ""}`}
              value={formData?.password}
              onChange={(e) => handleChange("password", e.target.value)}
              disabled={loading}
            />
            <div className="text-danger">{errors.password}</div>
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
              status={`${errors.role ? "error" : ""}`}
              optionFilterProp="label"
              value={userRoles?.roles[formData.role]?.text}
              onChange={(e) => {
                handleChange("role", e + "");
              }}
              options={userRoles.rolesDropdown}
              disabled={loading}
            />
            <div className="text-danger">{errors.role}</div>
          </div>
        </Col>
      </Row>
    </Drawer>
  );
};

export default AddEditUser;
