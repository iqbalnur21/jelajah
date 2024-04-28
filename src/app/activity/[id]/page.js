"use client";
import getMethod from "@/utils/getMethod";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/user/Navbar";
import axios from "axios";
import "@/assets/user/css/custom.css";
import "@/assets/user/css/theme.css";
import { formatPrice } from "@/utils";

export default function DetailActivityPage({ params }) {
  const { GET } = getMethod();
  const [url, setUrl] = useState("");
  const [activity, setActivity] = useState({});
  const [iframeDimensions, setIframeDimensions] = useState({
    width: "350",
    height: "200",
  });
  const calDisc = (
    ((activity.price - activity.price_discount) / activity.price) *
    100
  ).toFixed(2);
  const discount = calDisc < 1 ? 100 : calDisc;
  useEffect(() => {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      iframe.width = iframeDimensions.width;
      iframe.height = iframeDimensions.height;
    }
  }, [iframeDimensions]);
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
    import("@/assets/user/fontawesome/all.min.js");
    import("@/assets/user/js/theme.js");
    import("@/assets/user/js/custom.js");
    GET(`activity/${params.id}`).then((res) => setActivity(res.data.data));
  }, []);
  async function checkImageUrls(activity) {
    if (activity.imageUrls?.length > 1) {
      for (const urlDetail of activity.imageUrls) {
        try {
          const response = await axios.head(urlDetail);
          if (
            response.status === 200 &&
            response.headers["content-type"].startsWith("image")
          ) {
            setUrl(urlDetail);
          }
        } catch (error) {
          // console.error("Error occurred while checking image URL:", error);
        }
      }
    }
  }

  checkImageUrls(activity.imageUrls ? activity?.imageUrls[0] : activity);

  if (!url) {
    setUrl(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1714091131455-default-image.jpg"
    );
  }
  let iframe = document.querySelector("iframe");
  if (iframe) {
    iframe.width = "350";
    iframe.height = "200";
  }
  console.log(document.querySelector("iframe"));
  return (
    <>
      <Navbar />
      <div class="container my-3 br-3 p-3 rounded bg-primary-gradient">
        <div class="text-white border-start border-5 border-secondary fs-2 p-2 mb-3">
          Detail Aktivitas
        </div>
        <div class="row row-cols-1 row-cols-md-1 g-4">
          <div class="col d-flex justify-content-center">
            <div class="card border-0">
              <div class="row">
                <div class="col-md-6 justify-content-center d-flex align-items-center bg-primary-gradient">
                  <img
                    class="img-fluid m-5"
                    style={{ borderRadius: "20px" }}
                    src={activity?.imageUrls ? activity?.imageUrls[0] : url}
                    alt="Card image"
                  ></img>
                </div>
                <div class="col-md-6 mt-4" style={{ paddingLeft: "25px" }}>
                  <div class="card-body-right">
                    <div>
                      <h5 class="card-title">{activity.title}</h5>
                    </div>
                    <div className="d-grid" style={{ justifyItems: "start" }}>
                      <div className="d-flex align-items-center">
                        <p className="text-decoration-line-through text-900 mb-0">
                          {formatPrice(activity.price)}
                        </p>
                        <span className="badge bg-soft-secondary p-2 mx-2">
                          <i className="fas fa-tag text-secondary fs--2 me-0"></i>
                          <span className="text-secondary fw-normal fs--1">
                            -{discount}%
                          </span>
                        </span>
                      </div>
                      <h1 className="mb-3 text-primary fw-bolder fs-3">
                        <span>{formatPrice(activity.price_discount)}</span>
                      </h1>
                    </div>
                    <div class="text-dark">
                      <span class="text-secondary">
                        <i class="fas fa-star"></i>
                      </span>{" "}
                      {activity.rating}
                      &nbsp;/&nbsp;5 ({activity.total_reviews} Reviews)
                    </div>
                    <div class="text-dark">
                      <span>
                        <b>Fasilitas: </b>
                        {activity.facilities
                          ? activity.facilities
                              .replace(/<p>/g, "")
                              .replace(/<\/p>/g, "")
                          : " "}
                      </span>
                    </div>
                    <div class="text-dark">
                      <span>
                        <b>Lokasi: </b>
                        {`${activity.city}, ${activity.province}`}
                      </span>
                    </div>
                    <div class="text-dark mb-3">
                      <span>
                        <b>Alamat: </b>
                        {`${activity.address}`}
                      </span>
                    </div>
                    <p class="text-dark text-align-justify">
                      {activity.description}
                    </p>
                    <div style={{ maxWidth: "200px" }}>
                      {activity.location_maps ? (
                        <>
                          <span class="text-dark">Google Maps: </span>
                          <iframe
                            srcDoc={activity.location_maps}
                            width={400}
                            height={300}
                            frameBorder="0"
                            scrolling="no"
                            title="Maps"
                            style={{ border: "none" }}
                            allowFullScreen
                          ></iframe>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
