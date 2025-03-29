"use client";
import CustomSpinner from "@/components/common/custom-spinner/CustomSpinner";
import { formatDate, formatNumber } from "@/components/utils/utils";
import { jobStatus, jobType, userRoles } from "@/enum-list/enumList";
import { jobService } from "@/service/json-service/jobService";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { TbUserShare } from "react-icons/tb";
import AddEditJob from "./AddEditJob";
import { AiOutlineUserAdd } from "react-icons/ai";
import { userService } from "@/service/json-service/userService";

export default function JobListing() {
  const [loading, setLoading] = useState();
  const [jobs, setJobs] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [drawer, setDrawer] = useState({ show: false, data: null });

  const handleEditClick = (record) => {
    setDrawer({ show: true, data: record });
  };

  const columns = [
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "name",
      width: 160,
      render: (item) => formatDate(item),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 150,
      render: (item, record) => (
        <div className="fw-semibold text-success text-wrap">{item}</div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (item, record) => <div>{record.job_categories?.name}</div>,
    },
    {
      title: "Salary Range",
      dataIndex: "salary",
      key: "salary",
      width: 150,
      render: (item, record) => (
        <div>
          {formatNumber(record.salary_from)} - {formatNumber(record.salary_to)}{" "}
          LPA
        </div>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 150,
    },
    {
      title: "Recruiter",
      dataIndex: "recruiter",
      key: "recruiter",
      width: 150,
      render: (item, record) => (
        <div className="d-flex align-items-center">
          <TbUserShare />
          <div className="ms-1 text-wrap">{record.users?.name}</div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "job_type",
      key: "location",
      width: 100,
      render: (item) => {
        return <div className="fw-semibold">{jobType.text[item]}</div>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "role",
      width: 100,
      render: (item) => {
        return (
          <Badge bg={`${jobStatus?.status[item]?.class}`}>
            {jobStatus?.status[item]?.text}
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
            <div onClick={() => handleEditClick(record)}>
              <FaRegEdit className="fs-5 text-secondary cursor-pointer" />
            </div>
            <div
              onClick={() => {
                // setUserInfo((prev) => ({ ...prev, show: false }));
                // setConfirmDelete({ show: true, name: name, id: record.id });
              }}
            >
              <MdDeleteOutline className="fs-4 ms-2 text-secondary cursor-pointer" />
            </div>
          </div>
        );
      },
    },
  ];

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const jobs = await jobService.getJobs();
      setJobs(jobs);

      const recruiters = await userService.getRecruiters();
      setRecruiters(
        recruiters.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      );

      const categories = await jobService.getCategories();

      setCategories(
        categories.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  console.log(categories);

  return (
    <React.Fragment>
      {loading ? (
        <CustomSpinner />
      ) : (
        <React.Fragment>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Listing</h5>
            <Button type="primary" onClick={() => setDrawer({ show: true })}>
              <AiOutlineUserAdd className="fs-5" />
              <span>Add User</span>
            </Button>
          </div>

          <Table
            rowKey="id"
            size="small"
            columns={columns}
            dataSource={jobs}
            // pagination={{ pageSize: 20 }}
            // scroll={{ y: 100 * 5 }}
            scroll={{ x: "max-content" }}
          />
          <AddEditJob
            show={drawer.show}
            data={drawer.data}
            onClose={() => setDrawer({ show: false, data: null })}
            setJobs={setJobs}
            recruiters={recruiters}
            categories={categories}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
