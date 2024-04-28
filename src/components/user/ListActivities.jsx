"use client";
import getMethod from "@/utils/getMethod";
import React, { useEffect, useState } from "react";
import CardActivities from "./CardActivities";

function ListActivities() {
  const [activities, setActivities] = useState([]);
  const { GET } = getMethod();

  useEffect(() => {
    GET("activities").then((res) => setActivities(res.data.data));
  }, []);
  const numSlides = Math.ceil(activities.length / 3);
  const slideNumbers = Array.from({ length: numSlides }, (_, index) => index);
  let myArr = [];
  
  if(activities.length === 0){
    return null
  }
  return (
    <>
      <section id="activities">
        <div className="container">
          <div className="row h-100">
            <div className="col-lg-7 mx-auto text-center mb-6">
              <h5 className="fw-bold fs-3 fs-lg-5 lh-sm mb-3">Aktivitas</h5>
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
                          <CardActivities activity={arrDetail} key={keyIn} />
                        )
                      );
                      myArr = [];
                      return (
                        <div
                        key={adjustedKey}
                          className={
                            "carousel-item" +
                            (adjustedKey === 3 ||
                              adjustedKey === activities.length ? " active" : "")
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

                      {/* <li
                        data-bs-target="#carouselActivities"
                        data-bs-slide-to="1"
                      ></li>
                      <li
                        data-bs-target="#carouselActivities"
                        data-bs-slide-to="2"
                      ></li>
                      <li
                        data-bs-target="#carouselActivities"
                        data-bs-slide-to="3"
                      ></li> */}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ListActivities;
