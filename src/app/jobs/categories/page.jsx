"use client";
import CustomSpinner from "@/components/common/custom-spinner/CustomSpinner";
import { jobService } from "@/service/json-service/jobService";
import React, { useEffect, useState } from "react";

export default function JobCategories() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await jobService.getCategories();
      setCategories(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <CustomSpinner />
      ) : (
        <React.Fragment>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Categories</h5>
          </div>{" "}
          <React.Fragment>Loaded</React.Fragment>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
