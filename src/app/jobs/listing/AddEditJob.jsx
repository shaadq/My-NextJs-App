"use client";
import CustomSpinner from "@/components/common/custom-spinner/CustomSpinner";
import { jobStatus, jobType, userRoles } from "@/enum-list/enumList";
import { jobService } from "@/service/json-service/jobService";
import { userService } from "@/service/json-service/userService";
import { Button, Drawer, Input, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
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
    description: "This is the default job description.",
    salary_from: "",
    salary_to: null,
    category_id: null,
    location: "",
    job_type: null,
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

    if (!formData.title?.trim()) newErrors.title = "Please enter a title";
    if (!formData.job_type?.trim())
      newErrors.job_type = "Please select a job type";
    if (!formData.salary_from)
      newErrors.salary_from = "Please enter the starting salary";
    if (!formData.salary_to)
      newErrors.salary_to = "Please enter the ending salary";
    if (!formData.status?.trim()) newErrors.status = "Please select a status";
    if (!formData.category_id?.trim())
      newErrors.category_id = "Please select a category";
    if (!formData.recruiter_id?.trim())
      newErrors.recruiter_id = "Please select a recruiter";
    if (!formData.description?.trim())
      newErrors.description = "Please enter a job description";
    if (!formData.location?.trim())
      newErrors.location = "Please enter a location";

    // Condition: salary_to must be greater than or equal to salary_from
    if (
      formData.salary_from &&
      formData.salary_to &&
      formData.salary_to < formData.salary_from
    ) {
      newErrors.salary_to = "Invalid salary range";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (data) {
        await jobService.updateJob(data.id, formData);
      } else {
        await jobService.addJob(formData);
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
              <div className="text-danger">{errors.job_type}</div>
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
                    placeholder="from amount"
                    status={`${errors.salary_from ? "error" : ""}`}
                    value={formData?.salary_from}
                    onChange={(e) =>
                      handleChange("salary_from", e.target.value - "")
                    }
                    disabled={loading}
                  />
                  <div className="text-danger">{errors.salary_from}</div>
                </Col>
                <Col>
                  <Input
                    addonBefore="To (₹)"
                    type="text"
                    placeholder="to amount"
                    status={`${errors.salary_to ? "error" : ""}`}
                    value={formData?.salary_to}
                    onChange={(e) =>
                      handleChange("salary_to", e.target.value - "")
                    }
                    disabled={loading}
                  />
                  <div className="text-danger">{errors.salary_to}</div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-semibold">
                Status
              </label>
              <Select
                className="w-100"
                placeholder="Select Status"
                status={`${errors.status ? "error" : ""}`}
                optionFilterProp="label"
                value={jobStatus?.text[formData.status]}
                onChange={(e) => {
                  handleChange("status", e + "");
                }}
                options={jobStatus.dropdown}
                disabled={loading}
              />
              <div className="text-danger">{errors.status}</div>
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-semibold">
                Recruiter
              </label>
              <Select
                className="w-100"
                placeholder="Select Recruiter"
                status={errors.recruiter_id ? "error" : ""}
                optionFilterProp="label"
                value={formData?.recruiter_id || null} // Ensure correct value selection
                onChange={(value) => handleChange("recruiter_id", value)}
                options={recruiters || []} // Prevents errors if dropdown is undefined
                disabled={loading}
              />
              <div className="text-danger">{errors.recruiter_id}</div>
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-semibold">
                Category
              </label>
              <Select
                className="w-100"
                placeholder="Select Category"
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
                placeholder="Location"
                status={`${errors.location ? "error" : ""}`}
                value={formData?.location}
                onChange={(e) => handleChange("location", e.target.value)}
                disabled={loading}
              />
              <div className="text-danger">{errors.location}</div>
            </div>
          </Col>
          <Col md={12}>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-semibold">
                Job Description
              </label>
              <TextArea
                type="text"
                placeholder="Description"
                status={`${errors.description ? "error" : ""}`}
                value={formData?.description}
                onChange={(e) => handleChange("description", e.target.value)}
                disabled={loading}
                rows={5}
              />
              <div className="text-danger">{errors.description}</div>
            </div>
          </Col>
        </Row>
      )}
    </Drawer>
  );
};

export default AddEditJob;
