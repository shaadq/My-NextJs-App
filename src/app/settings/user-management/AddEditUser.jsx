"use client";
import CustomSpinner from "@/components/common/custom-spinner/CustomSpinner";
import { userRoles } from "@/enum-list/enumList";
import { userService } from "@/service/json-service/userService";
import { userProfilesService } from "@/service/json-service/userProfilesService";
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
    contact: "",
    location: "",
  };

  const [formData, setFormData] = useState(initialValue);
  const [loading, setLoading] = useState({ button: false, page: false });
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

    setLoading((prev) => ({ ...prev, button: true }));
    try {
      const user_Payload = {
        name: formData.name,
        password: formData.password,
        email: formData.email,
        role: formData.role,
      };
      const userProfile_Payload1 = {
        location: formData.location,
        contact: formData.contact,
      };

      if (data) {
        await userService.updateUser(data.id, user_Payload);
        await userProfilesService.updateUserProfile(
          // formData.userprofile_id,
          data.id,
          userProfile_Payload1
        );
      } else {
        const response = await userService.addUser(user_Payload, setErrors);
        const userProfile_Payload = {
          location: formData.location,
          contact: formData.contact,
          user_id: response?.user?.id,
        };
        await userProfilesService.addUserProfile(userProfile_Payload);
      }

      onClose();
      const users = await userService.fetchAllUsers();
      toast.info(`${data ? "User info updated!" : "New user added!"}`);
      setUsers(users);
      setFormData(initialValue);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading((prev) => ({ ...prev, button: false }));
    }
  };

  const handleClose = () => {
    onClose();
    setErrors({});
    setFormData(initialValue);
  };

  const initialFunction = async () => {
    setLoading((prev) => ({ ...prev, page: true }));
    try {
      if (data) {
        const userProfileData =
          await userProfilesService.getUserProfileByUserId(data.id);
        setFormData({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
          userprofile_id: userProfileData.id,
          location: userProfileData.location,
          contact: userProfileData.contact,
        });
      } else {
        setFormData(initialValue);
      }
    } catch (error) {
    } finally {
      setLoading((prev) => ({ ...prev, page: false }));
    }
  };

  useEffect(() => {
    initialFunction();
  }, [data]);

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
          <Button
            onClick={handleClose}
            variant="text"
            disabled={loading.button || loading.page}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            type="primary"
            disabled={loading.button || loading.page}
          >
            <span>{data ? "Update" : "Add"}</span>
            {loading.button ? <Spinner size="sm" /> : null}
          </Button>
        </Space>
      }
    >
      {loading.page ? (
        <CustomSpinner />
      ) : (
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
                disabled={loading.button}
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
                disabled={loading.button || data}
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
                disabled={loading.button}
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
                disabled={loading.button}
              />
              <div className="text-danger">{errors.role}</div>
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-semibold">
                Contact
              </label>
              <Input
                type="text"
                placeholder="Contact"
                status={`${errors.contact ? "error" : ""}`}
                value={formData?.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                disabled={loading.button}
              />
              <div className="text-danger">{errors.contact}</div>
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-semibold">
                Location
              </label>
              <Input
                type="text"
                placeholder="Location"
                status={`${errors.location ? "error" : ""}`}
                value={formData?.location}
                onChange={(e) => handleChange("location", e.target.value)}
                disabled={loading.button}
              />
              <div className="text-danger">{errors.location}</div>
            </div>
          </Col>
        </Row>
      )}
    </Drawer>
  );
};

export default AddEditUser;
