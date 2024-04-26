"use client"
import useGetData from "@/services/useGetData";
import React, { useEffect, useState } from "react";

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const { getData } = useGetData();

  useEffect(() => {
    getData("banners").then((res) => setBanners(res.data.data));
  }, []);

  return (
    <>
      <div id="carouselExampleFade" className="carousel slide carousel-fade container" data-bs-ride="carousel">
        <div className="carousel-inner">
          {banners.map((banner, key) => (
            <div
              className={"carousel-item" + (key === 0 ? " active" : "")}
              data-bs-interval="2000"
              key={key}
            >
              <img
                src={banner.imageUrl}
                className="d-block w-100 rounded object-fit-cover"
                style={{height: "600px"}}
              ></img>
              <div className="carousel-caption d-none d-md-block">
                <h3 className="text-white">{banner.name}</h3>
              </div>
            </div>
          ))}
          
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
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
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
