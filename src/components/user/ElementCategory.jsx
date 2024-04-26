import Link from "next/link";
import React from "react";

function ElementCategory({ category }) {
  return (
    <Link
      className="col-12 col-sm-4 col-md-3 col-lg-4 col-xl-2"
      style={{ textDecoration: "none" }}
      href={`/category/${category.id}`}
    >
      <div
        className="d-flex flex-column justify-content-center px-3"
        style={{
          backgroundImage: `url(${category.imageUrl})`,
          backgroundColor: "#240D8C",
          minHeight: "230px",
        }}
      >
        <h5 className="text-light" style={{ textShadow: "1px 1px 2px black" }}>
          {category.name}
        </h5>
        <i className="fas fa-arrow-right text-light mt-4"></i>
        <a className="stretched-link" href="#!"></a>
      </div>
    </Link>
  );
}

export default ElementCategory;
