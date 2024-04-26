import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function CardPromo({ promo }) {
  const [url, setUrl] = useState("");
  // const imageUrl = promo.imageUrl;
  // const discount =
  //   (
  //     ((promo.price_discount - promo.price) / promo.price_discount) *
  //     100
  //   ).toFixed(2) < 1
  //     ? 100
  //     : ((promo.price_discount - promo.price) / promo.price_discount) * 100;

  useEffect(() => {
    axios
      .head(promo.imageUrl)
      .then((response) => {
        if (
          response.status === 200 &&
          response.headers["content-type"].startsWith("image")
        ) {
          setUrl(promo.imageUrl);
        }
      })
      .catch((error) => {
        // console.error("Error occurred while checking image URL:", error);
      });
  }, [promo.imageUrls]);

  if (!url) {
    setUrl(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1714091131455-default-image.jpg"
    );
  }
  return (
    <Link
      href={`/promo/${promo.id}`}
      className="col-md-4 mb-3 mb-md-0 h-100"
      key={promo.id}
      style={{ textDecoration: "none" }}
    >
      <div className="card card-span h-100 text-white" style={{ padding: "0" }}>
        <img
          className="img-fluid object-fit-cover"
          src={url}
          alt="..."
          style={{ height: "300px" }}
        />
        <div
          className="card-img-overlay ps-0"
          style={{ display: "inline-table" }}
        >
          <span className="badge bg-primary ms-3 me-1 p-2">
            <i className="fas fa-ticket-alt me-1"></i>
            <span>{promo.promo_code}</span>
          </span>
        </div>
        <div className="card-body ps-0">
          <h5 className="fw-bold text-1000 mb-4 text-truncate">
            {promo.title}
          </h5>
          <div className="d-flex align-items-center justify-content-start">
            <span className="text-900">
              Dapatkan Promo Minimal Pembelanjaan &nbsp;
              {promo.minimum_claim_price
                .toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
                .slice(0, -3)}
            </span>
          </div>
          {/* <div className="d-flex align-items-center justify-content-start">
              <span
                className="text-800 fs--1 me-2"
                style={{ marginLeft: "2px" }}
              >
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <span className="text-900 me-2">{`${promo.city}, ${promo.province}`}</span>
            </div> */}
          <div className="d-grid" style={{ justifyItems: "start" }}>
            <p className="text-decoration-line-through text-900 mt-3 mb-0">
              {/* Dapatkan Promo Minimal Pembelanjaan 
                {promo.minimum_claim_price
                  .toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                  .slice(0, -3)} */}
            </p>
            <h1 className="mb-3 text-primary fw-bolder fs-3">
              <span>
                {promo.promo_discount_price
                  .toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                  .slice(0, -3)}
              </span>
              <span className="text-900 fs--1 fw-normal">/Per Orang</span>
            </h1>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardPromo;
