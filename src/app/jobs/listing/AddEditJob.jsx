"use client";
import CustomSpinner from "@/components/common/custom-spinner/CustomSpinner";
import { jobStatus, jobType, userRoles } from "@/enum-list/enumList";
import { jobService } from "@/service/json-service/jobService";
import { userService } from "@/service/json-service/userService";
import { Button, Drawer, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const AddEditJob = ({
  show,
  data,
  onClose,
  setJobs,
  recruiters,
  categories,
}) => {
  const initialValue = {
    title: "",
    description: "",
    salary_from: "",
    salary_to: null,
    category: null,
    location: "",
    type: null,
    status: null,
    recruiter_id: null,
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
    // if (!validateForm()) return; // Stop execution if validation fails

    setLoading(true);
    try {
      if (data) {
        await jobService.updateJob(data.id, formData);
      } else {
        await jobService.updateJob(formData);
      }

      onClose();
      const jobs = await jobService.getJobs();
      toast.info(`${data ? "Job details updated!" : "New job added!"}`);
      setJobs(jobs);
      setFormData(initialValue);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setErrors({});
    setFormData(initialValue);
  };

  const initialFunction = () => {
    if (data) {
      setFormData({
        title: data.title,
        job_type: data.job_type,
        salary_from: data.salary_from,
        salary_to: data.salary_to,
        location: data.location,
        status: data.status,
        recruiter_id: data.recruiter_id,
        description: data.description,
        category_id: data.category_id,
      });
    } else {
      setFormData(initialValue);
    }
  };

  useEffect(() => {
    initialFunction();
  }, [data]);

  return (
    <Drawer
      closable={false}
      title={`${data ? "Edit Job" : "Add Job"}`}
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
      {loading.page ? (
        <CustomSpinner />
      ) : (
        <Row md={2} className="w-100">
          <Col>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-semibold">
                Title
              </label>
              <Input
                type="text"
                placeholder="Job Title"
                status={`${errors.title ? "error" : ""}`}
                value={formData?.title}
                onChange={(e) => handleChange("title", e.target.value)}
                disabled={loading}
              />
              <div className="text-danger">{errors.title}</div>
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-semibold">
                Type
              </label>
              <Select
                className="w-100"
                placeholder="Select Job Type"
                status={`${errors.job_type ? "error" : ""}`}
                optionFilterProp="label"
                value={jobType?.text[formData.job_type]}
                onChange={(e) => {
                  handleChange("job_type", e + "");
                }}
                options={jobType.dropdown}
                disabled={loading}
              />
              <div className="text-danger">{errors.email}</div>
            </div>
          </Col>
          <Col md={12}>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-semibold">
                Salary Range
              </label>
              <Row md={2}>
                <Col>
                  <Input
                    addonBefore="From (₹)"
                    type="text"
                    status={`${errors.salary_from ? "error" : ""}`}
                    value={formData?.salary_from}
                    onChange={(e) =>
                      handleChange("salary_from", e.target.value - "")
                    }
                    disabled={loading}
                  />
                </Col>
                <Col>
                  <Input
                    addonBefore="To (₹)"
                    type="text"
                    status={`${errors.salary_to ? "error" : ""}`}
                    value={formData?.salary_to}
                    onChange={(e) =>
                      handleChange("salary_to", e.target.value - "")
                    }
                    disabled={loading}
                  />
                </Col>
              </Row>

              <div className="text-danger">{errors.password}</div>
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-semibold">
                Status
              </label>
              <Select
                className="w-100"
                placeholder="Select a person"
                status={`${errors.status ? "error" : ""}`}
                optionFilterProp="label"
                value={jobStatus?.text[formData.status]}
                onChange={(e) => {
                  handleChange("role", e + "");
                }}
                options={jobStatus.dropdown}
                disabled={loading}
              />
              <div className="text-danger">{errors.role}</div>
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-semibold">
                Recruiter
              </label>
              <Select
                className="w-100"
                placeholder="Select a person"
                status={errors.recruiter ? "error" : ""}
                optionFilterProp="label"
                value={formData?.recruiter_id || null} // Ensure correct value selection
                onChange={(value) => handleChange("recruiter_id", value)}
                options={recruiters || []} // Prevents errors if dropdown is undefined
                disabled={loading}
              />

              <div className="text-danger">{errors.recruiter}</div>
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-semibold">
                Category
              </label>
              <Select
                className="w-100"
                placeholder="Select a person"
                status={errors.category_id ? "error" : ""}
                optionFilterProp="label"
                value={formData?.category_id || null}
                onChange={(value) => handleChange("category_id", value)}
                options={categories || []}
                disabled={loading}
              />

              <div className="text-danger">{errors.category_id}</div>
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-semibold">
                Location
              </label>
              <Input
                type="text"
                placeholder="Password"
                status={`${errors.location ? "error" : ""}`}
                value={formData?.location}
                onChange={(e) => handleChange("location", e.target.value)}
                disabled={loading}
              />
              <div className="text-danger">{errors.location}</div>
            </div>
          </Col>
        </Row>
      )}
    </Drawer>
  );
};

export default AddEditJob;
