"use client";
import Header from "@/components/common/header/Header";
import Logout from "@/components/common/logout/Logout";
import { myServices } from "@/service/json-service/service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";

const ProductDetail = () => {
  const params = useParams();
  const { id } = params;
  const [singleProduct, setSingleProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductByID = async () => {
      setLoading(true);
      try {
        const data = await myServices.fetchProductByID(id);
        setSingleProduct(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchProductByID();
  }, []);

  console.log(singleProduct);

  return (
    <div>
      <Header>
        <div className="d-flex align-items-center justify-content-between h-100">
          <h4 className="mb-0">Product - {id}</h4>
          <Logout />
        </div>
      </Header>

      <div className="content-wrapper">
        {loading ? (
          <div className="h-100 d-flex align-items-center justify-content-center w-100">
            <Spinner variant="success" />
          </div>
        ) : (
          <Row>
            {/* Product Image */}
            <Col md={4}>
              <img
                src={
                  singleProduct?.thumbnail ?? "https://via.placeholder.com/150"
                }
                alt={singleProduct?.title ?? "Product Image"}
                className="img-fluid w-100"
              />
            </Col>

            {/* Product Details */}
            <Col md={8}>
              <h2>{singleProduct?.title ?? "No Title Available"}</h2>
              <p>{singleProduct?.description ?? "No Description Available"}</p>

              <ul>
                <li>
                  <strong>Category:</strong> {singleProduct?.category ?? "N/A"}
                </li>
                <li>
                  <strong>Brand:</strong> {singleProduct?.brand ?? "N/A"}
                </li>
                <li>
                  <strong>Price:</strong> ${singleProduct?.price ?? "0.00"}
                </li>
                <li>
                  <strong>Discount:</strong>{" "}
                  {singleProduct?.discountPercentage ?? "0"}%
                </li>
                <li>
                  <strong>Rating:</strong>{" "}
                  {singleProduct?.rating ?? "No Ratings"}
                </li>
                <li>
                  <strong>Stock:</strong> {singleProduct?.stock ?? "0"} (
                  {singleProduct?.availabilityStatus ?? "Unknown"})
                </li>
                <li>
                  <strong>SKU:</strong> {singleProduct?.sku ?? "N/A"}
                </li>
                <li>
                  <strong>Weight:</strong> {singleProduct?.weight ?? "N/A"}g
                </li>
                <li>
                  <strong>Dimensions:</strong>
                  {singleProduct?.dimensions?.width ?? "N/A"} x{" "}
                  {singleProduct?.dimensions?.height ?? "N/A"} x{" "}
                  {singleProduct?.dimensions?.depth ?? "N/A"} cm
                </li>
                <li>
                  <strong>Warranty:</strong>{" "}
                  {singleProduct?.warrantyInformation ?? "No Warranty"}
                </li>
                <li>
                  <strong>Shipping:</strong>{" "}
                  {singleProduct?.shippingInformation ??
                    "Shipping Info Unavailable"}
                </li>
                <li>
                  <strong>Return Policy:</strong>{" "}
                  {singleProduct?.returnPolicy ?? "No Return Policy"}
                </li>
                <li>
                  <strong>Minimum Order:</strong>{" "}
                  {singleProduct?.minimumOrderQuantity ?? "N/A"}
                </li>
                <li>
                  <strong>Barcode:</strong>{" "}
                  {singleProduct?.meta?.barcode ?? "N/A"}
                </li>
                <li>
                  <strong>QR Code:</strong>
                  <br />
                  <img
                    src={
                      singleProduct?.meta?.qrCode ??
                      "https://via.placeholder.com/100"
                    }
                    alt="QR Code"
                    width="100"
                  />
                </li>
              </ul>

              {/* Tags */}
              <div>
                <strong>Tags:</strong>{" "}
                {singleProduct?.tags?.length > 0
                  ? singleProduct.tags.map((tag, index) => (
                      <span key={index} className="badge bg-secondary mx-1">
                        {tag}
                      </span>
                    ))
                  : "No Tags"}
              </div>

              {/* Reviews */}
              <h3>Reviews</h3>
              <ul>
                {singleProduct?.reviews?.length > 0 ? (
                  singleProduct.reviews.map((review, index) => (
                    <li key={index}>
                      <strong>{review?.reviewerName ?? "Anonymous"}:</strong>{" "}
                      {"⭐".repeat(review?.rating ?? 0)} - "
                      {review?.comment ?? "No Comment"}"
                    </li>
                  ))
                ) : (
                  <li>No Reviews Available</li>
                )}
              </ul>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
