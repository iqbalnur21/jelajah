"use client";
import getMethod from "@/utils/getMethod";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/user/Navbar";
import axios from "axios";
import "@/assets/user/css/custom.css";
import "@/assets/user/css/theme.css";
import CardActivities from "@/components/user/CardActivities";

export default function DetailActivityPage({ params }) {
  const [activities, setActivities] = useState([]);
  const [category, setCategory] = useState([]);
  const { GET } = getMethod();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
    import("@/assets/user/fontawesome/all.min.js");
    import("@/assets/user/js/theme.js");
    import("@/assets/user/js/custom.js");
    GET(`activities-by-category/${params.id}`).then((res) =>
      setActivities(res.data.data)
    );
    GET(`category/${params.id}`).then((res) => setCategory(res.data.data));
  }, []);
  const numSlides = Math.ceil(activities.length / 3);
  const slideNumbers = Array.from({ length: numSlides }, (_, index) => index);
  let myArr = [];
  console.log(activities.length);
  if (activities.length == 0) {
    return (
      <>
        <Navbar />
        <div class="container my-3 br-3 p-3 rounded bg-primary-gradient">
          <div class="text-white border-start border-5 border-secondary fs-2 p-2 mb-3">
            Aktivitas Berdasarkan Kategori {category.name}
          </div>
          <div class="row row-cols-1 row-cols-md-1 g-4">
            <div class="col d-flex justify-content-center">
              <div class="card">
                <div class="col justify-content-center d-flex align-items-center">
                  <img
                    class="img-fluid rounded w-100"
                    src={category.imageUrl}
                    alt="Card image"
                  ></img>
                </div>
                <section id="activities">
                  <div className="container">
                    <div className="row h-100">
                      <div className="col-lg-7 mx-auto text-center mb-6">
                        <h5 className="fw-bold fs-3 fs-lg-5 lh-sm mb-3">
                          Aktivitas Berdasarkan Kategori <i>{category.name}</i> Sedang Kosong
                        </h5>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div class="container my-3 br-3 p-3 rounded bg-primary-gradient">
        <div class="text-white border-start border-5 border-secondary fs-2 p-2 mb-3">
          Aktivitas Berdasarkan Kategori {category.name}
        </div>
        <div class="row row-cols-1 row-cols-md-1 g-4">
          <div class="col d-flex justify-content-center">
            <div class="card">
              <div class="col justify-content-center d-flex align-items-center">
                <img
                  class="img-fluid rounded w-100"
                  src={category.imageUrl}
                  alt="Card image"
                ></img>
              </div>
              <section id="activities">
                <div className="container">
                  <div className="row h-100">
                    <div className="col-lg-7 mx-auto text-center mb-6">
                      <h5 className="fw-bold fs-3 fs-lg-5 lh-sm mb-3">
                        Aktivitas
                      </h5>
                    </div>
                    <div className="col-12">
                      <div
                        className="carousel slide"
                        id="carouselActivities"
                        data-bs-ride="carousel"
                      >
                        <div className="carousel-inner">
                          {activities.map((activity, key) => {
                            let adjustedKey = key + 1;
                            myArr.push(activity);
                            if (
                              adjustedKey % 3 === 0 ||
                              adjustedKey === activities.length
                            ) {
                              const renderedActivities = myArr.map(
                                (arrDetail, keyIn) => (
                                  <CardActivities
                                    activity={arrDetail}
                                    key={keyIn}
                                  />
                                )
                              );
                              myArr = [];
                              return (
                                <div
                                key={adjustedKey}
                                  className={
                                    "carousel-item" +
                                    (adjustedKey === 3 ? " active" : ""||
                                    adjustedKey === activities.length)
                                  }
                                  data-bs-interval="3000"
                                >
                                  <div
                                    className="row h-100 align-items-center g-2"
                                    key={key}
                                  >
                                    {renderedActivities}
                                  </div>
                                </div>
                              );
                            }
                          })}
                          <div className="row">
                            <button
                              className="carousel-control-prev"
                              type="button"
                              data-bs-target="#carouselActivities"
                              data-bs-slide="prev"
                            >
                              <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                              ></span>
                              <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                              className="carousel-control-next"
                              type="button"
                              data-bs-target="#carouselActivities"
                              data-bs-slide="next"
                            >
                              <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                              ></span>
                              <span className="visually-hidden">Next </span>
                            </button>
                          </div>
                        </div>
                        <div className="row flex-center">
                          <div className="col-auto position-relative z-index-2">
                            <ol className="carousel-indicators me-xxl-7 me-xl-4 me-lg-7">
                              {slideNumbers.map((slideNumber, index) => {
                                const isActive = index === 0 ? "active" : "";
                                return (
                                  <li
                                    key={index}
                                    className={isActive}
                                    data-bs-target="#carouselActivities"
                                    data-bs-slide-to={slideNumber}
                                  ></li>
                                );
                              })}
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
