import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function CardActivities({ activity }) {
  const [url, setUrl] = useState("");
  const imageUrl = activity.imageUrls;
  const calDisc = (
    ((activity.price - activity.price_discount) / activity.price) *
    100
  ).toFixed(2);
  const discount = calDisc < 1 ? 100 : calDisc;

  useEffect(() => {
    imageUrl.forEach((urlDetail) => {
      axios
        .head(urlDetail)
        .then((response) => {
          if (
            response.status === 200 &&
            response.statusText === "OK" &&
            response.headers["content-type"].startsWith("image")
          ) {
            setUrl(urlDetail);
          } else {
            setUrl(
              "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1714091131455-default-image.jpg"
            );
          }
        })
        .catch((error) => {
          console.error("Error occurred while checking image URL:", error);
          setUrl(
            "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1714091131455-default-image.jpg"
          );
        });
    });
  }, [activity.imageUrls]);

  // if (!url) {
  //   setUrl(
  //     "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1714091131455-default-image.jpg"
  //   );
  // }
  console.log(url);
  return (
    <Link
      href={`/activity/${activity.id}`}
      className="col-md-4 mb-3 mb-md-0 h-100"
      key={activity.id}
      style={{ textDecoration: "none" }}
    >
      <div className="card card-span h-100 text-white" style={{ padding: "0" }}>
        <img
          className="img-fluid object-fit-cover"
          src={url}
          alt="..."
          style={{ height: "350px" }}
        />
        <div
          className="card-img-overlay ps-0"
          style={{ display: "inline-table" }}
        >
          <span className="badge bg-secondary ms-3 me-1 p-2">
            <i className="fas fa-star me-1"></i>
            <span>{activity.rating}</span>
          </span>
        </div>
        <div className="card-body ps-0">
          <h5 className="fw-bold text-1000 mb-4 text-truncate">
            {activity.title}
          </h5>
          <div className="d-flex align-items-center justify-content-start">
            <span className="text-800 fs--1 me-2">
              <i className="fas fa-home"></i>
            </span>
            <span className="text-900">
              {activity?.facilities?.replace(/<p>/g, "").replace(/<\/p>/g, "")}
            </span>
          </div>
          <div className="d-flex align-items-center justify-content-start">
            <span className="text-800 fs--1 me-2" style={{ marginLeft: "2px" }}>
              <i className="fas fa-map-marker-alt"></i>
            </span>
            <span className="text-900 me-2">{`${activity.city}, ${activity.province}`}</span>
          </div>
          <div className="d-grid" style={{ justifyItems: "start" }}>
            <p className="text-decoration-line-through text-900 mt-3 mb-0">
              {activity?.price
                ?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
                .slice(0, -3)}
            </p>
            <h1 className="mb-3 text-primary fw-bolder fs-3">
              <span>
                {activity?.price_discount
                  ?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                  .slice(0, -3)}
              </span>
              <span className="text-900 fs--1 fw-normal">/Per Orang</span>
            </h1>
            <span className="badge bg-soft-secondary p-2">
              <i className="fas fa-tag text-secondary fs--1 me-1"></i>
              <span className="text-secondary fw-normal fs-1">
                -{discount}%
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardActivities;
