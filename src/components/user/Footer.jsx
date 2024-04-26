import React from "react";

function Footer() {
  return (
    <>
      <section className="container py-0 overflow-hidden" id="footer">
        <div className="col-12 col-8 col-lg-12 bg-primary-gradient bg-offcanvas-right">
          <div className="p-3 py-7 p-md-7 text-center">
            <p className="text-light">
              <i className="fas fa-phone-alt me-3"></i>
              <span className="text-light">+628321654877</span>
            </p>
            <p className="text-light">
              <i className="fas fa-envelope me-3"></i>
              <span className="text-light">support@jelajah.com</span>
            </p>
            <p className="text-light">
              <i className="fas fa-map-marker-alt me-3"></i>
              <span className="text-light lh-lg">
                Pasaraya Blok M Gedung B Lt. 6, Jl. Iskandarsyah II
                <br />
                Daerah Khusus Ibukota Jakarta, 12160
              </span>
            </p>
            <div className="mt-6">
              <a href="#!">
                {" "}
                <img
                  className="me-3"
                  src="https://technext.github.io/voyage-2/v1.0.2/assets/img/icons/facebook.svg"
                  alt="..."
                />
              </a>
              <a href="#!">
                {" "}
                <img
                  className="me-3"
                  src="https://technext.github.io/voyage-2/v1.0.2/assets/img/icons/twitter.svg"
                  alt="..."
                />
              </a>
              <a href="#!">
                {" "}
                <img
                  className="me-3"
                  src="https://technext.github.io/voyage-2/v1.0.2/assets/img/icons/instagram.svg"
                  alt="..."
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
