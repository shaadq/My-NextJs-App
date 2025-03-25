"use client";
import React, { useState } from "react";
import "./MyForm.scss";
import { Col, Row } from "react-bootstrap";

const MyForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const inputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md={6}>
          <Row>
            <Col md={6}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => inputChange(e)}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => inputChange(e)}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <div>
        {" "}
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default MyForm;
