"use client";
import Badge from "@/components/common/badge/Badge";
import "./Products.scss";
import Header from "@/components/common/header/Header";
import Logout from "@/components/common/logout/Logout";
import { enumList } from "@/enum-list/enumList";
import { myServices } from "@/service/json-service/service";
import { Card, Rate, Table } from "antd";
import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import ProductCard from "./ProductCard";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const data = await myServices.fetchAllProducts();
        // setProducts(
        //   data.map((item, index) => ({ ...item, key: item.id || index }))
        // );
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
      key: "title",
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      //   filters: products
      //     .map((item) => ({
      //       text: item.category,
      //       value: item.category,
      //     }))
      //     .filter(
      //       (item, index, self) =>
      //         index === self.findIndex((t) => t.value === item.value)
      //     ), // Remove duplicates,
      //   onFilter: (value, record) => record.category.startsWith(value),
      //   filterSearch: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "address",
      render: (text) => <div>${text}</div>,
    },
    {
      title: "Discount",
      dataIndex: "discountPercentage",
      key: "address",
      render: (text) => <div>{text}%</div>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "address",
    },
  ];

  return (
    <div>
      <Header>
        <div className="d-flex align-items-center justify-content-between h-100">
          <h4 className="mb-0">Products ({products.length})</h4>
          <Logout />
        </div>
      </Header>
      
      <div className="content-wrapper">
        {/* <Table columns={columns} dataSource={products} loading={loading} /> */}
        {loading ? (
          <div className="h-100 d-flex align-items-center justify-content-center w-100">
            <Spinner variant="success" />
          </div>
        ) : (
          <Row md={5}>
            {products.map((item, index) => (
              <Col className="mb-4" key={index}>
                <ProductCard item={item} index={index} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
