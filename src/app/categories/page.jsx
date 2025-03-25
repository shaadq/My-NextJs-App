"use client";
import Header from "@/components/common/header/Header";
import Logout from "@/components/common/logout/Logout";
import { myServices } from "@/service/json-service/service";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true);
      try {
        const data = await myServices.fetchAllCategories();
        setCategories(
          data.map((item, index) => ({ ...item, key: item.id || index }))
        ); // Ensure unique key
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);

  return (
    <div>
      <Header>
        <div className="d-flex align-items-center justify-content-between h-100">
          <h4 className="mb-0">Categories</h4>
          <Logout />
        </div>
      </Header>
      <div className="content-wrapper">
        <Row>
          {categories.map((item, index) => (
            <Col md={2} key={index}>
              <Card
                size="small"
                title={`${item.name}`}
                // extra={<a href="#">More</a>}
                className="mb-4"
              >
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
