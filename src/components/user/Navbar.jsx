import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top py-3 d-block"
        data-navbar-on-scroll="data-navbar-on-scroll"
        style={{
          backgroundImage: "none",
          backgroundColor: "rgba(255, 255, 255, 0)",
          transition: "none 0s ease 0s",
        }}
      >
        <div className="container">
          <Link className="navbar-brand" href="/">
            <span className="fw-bold text-primary ms-2">Jelajah</span>
          </Link>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto pt-2 pt-lg-0 font-base">
              <li className="nav-item px-2">
                <a
                  className="nav-link fw-medium active"
                  aria-current="page"
                  href="/#promos"
                >
                  <span className="nav-link-icon text-800 me-1 fas fa-tag"></span>
                  <span className="nav-link-text">Promo</span>
                </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" href="/#categories">
                  {" "}
                  <span className="nav-link-icon text-800 me-1 fas fa-list"></span>
                  <span className="nav-link-text">Kategori</span>
                </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" href="/#activities">
                  {" "}
                  <span className="nav-link-icon text-800 me-1 fas fa-walking"></span>
                  <span className="nav-link-text">Aktifitas</span>
                </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" href="/#footer">
                  <span className="nav-link-icon text-800 me-1 fas fa-phone"></span>
                  <span className="nav-link-text">Kontak</span>
                </a>
              </li>
            </ul>
            <form>
              <Link className="btn btn-voyage-outline order-0" href="/login">
                <span className="text-primary">Login</span>
              </Link>
            </form>
          </div>
        </div>
      </nav>
      <section className="mt-7 py-0">
        <div
          className="bg-holder w-50 bg-right d-none d-lg-block"
          style={{
            backgroundImage:
              "https://technext.github.io/voyage-2/v1.0.2/assets/img/gallery/hero-section-1.png",
          }}
        ></div>
      </section>
    </>
  );
}

export default Navbar;
