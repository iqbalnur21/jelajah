"use client"
import getMethod from "@/utils/getMethod";
import React, { useEffect, useState } from "react";
import ElementCategory from "./ElementCategory";

function ListCategory() {
  const [categories, setCategory] = useState([]);
  const { GET } = getMethod();

  useEffect(() => {
    GET("categories").then((res) => setCategory(res.data.data));
  }, []);
  if(categories.length === 0){
    return null
  }
  return (
    <>
      <section className="py-0 container" id="categories">
        <div className="container-fluid">
          <div className="row h-100">
            <div className="col-lg-7 mx-auto text-center mb-6">
              <h5 className="fw-bold fs-3 fs-lg-5 lh-sm mb-3">
                Cari Aktivitas Berdasarkan Kategori
              </h5>
            </div>
          </div>
          <div className="row g-0 flex-center">
            {categories.map((category, key) => (
              <ElementCategory category={category} key={key} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ListCategory;
