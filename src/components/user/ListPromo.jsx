"use client"
import useGetData from "@/services/useGetData";
import React, { useEffect, useState } from "react";
import CardPromo from "./CardPromo";
import "bootstrap/dist/css/bootstrap.min.css";

function ListPromo() {
  const [promos, setPromos] = useState([]);
  const { getData } = useGetData();

  useEffect(() => {
    getData("promos").then((res) => setPromos(res.data.data));
  }, []);
  const numSlides = Math.ceil(promos.length / 3);
  const slideNumbers = Array.from({ length: numSlides }, (_, index) => index);
  let myArr = [];
  if(promos.length === 0){
    return null
  }
  return (
    <>
      <section id="promos">
        <div className="container">
          <div className="row h-100">
            <div className="col-lg-7 mx-auto text-center mb-6">
              <h5 className="fw-bold fs-3 fs-lg-5 lh-sm mb-3">Promo</h5>
            </div>
            <div className="col-12">
              <div
                className="carousel slide"
                id="carouselPromo"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {promos.map((promo, key) => {
                    let adjustedKey = key + 1;
                    myArr.push(promo);
                    if (adjustedKey % 3 === 0 || adjustedKey === promos.length) {
                      const renderedPromos = myArr.map((arrDetail, keyIn) => (
                        <CardPromo promo={arrDetail} key={keyIn} />
                      ));
                      myArr = [];
                      return (
                        <div
                          className={
                            "carousel-item" + (adjustedKey === 3 ? " active" : "")
                          }
                          data-bs-interval="3000"
                        >
                          <div
                            className="row h-100 align-items-center g-2"
                            key={key}
                          >
                            {renderedPromos}
                          </div>
                        </div>
                      );
                    }
                  })}
                  <div className="row">
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselPromo"
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
                      data-bs-target="#carouselPromo"
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
                            data-bs-target="#carouselPromo"
                            data-bs-slide-to={slideNumber}
                          ></li>
                        );
                      })}

                      {/* <li
                        data-bs-target="#carouselPromo"
                        data-bs-slide-to="1"
                      ></li>
                      <li
                        data-bs-target="#carouselPromo"
                        data-bs-slide-to="2"
                      ></li>
                      <li
                        data-bs-target="#carouselPromo"
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

export default ListPromo;
