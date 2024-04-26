"use client";
import getMethod from "@/utils/getMethod";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/user/Navbar";
import axios from "axios";
import "@/assets/user/css/custom.css";
import "@/assets/user/css/theme.css";

export default function DetailPromoPage({ params }) {
  const { GET } = getMethod();
  const [url, setUrl] = useState("");
  const [promo, setPromo] = useState({});
  const calDisc = (
    ((promo.price - promo.price_discount) / promo.price) *
    100
  ).toFixed(2);
  const discount = calDisc < 1 ? 100 : calDisc;
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
    import("@/assets/user/fontawesome/all.min.js");
    import("@/assets/user/js/theme.js");
    GET(`promo/${params.id}`).then((res) => setPromo(res.data.data));
  }, []);
  async function checkImageUrls(promo) {
    try {
      const response = await axios.head(promo.imageUrl);
      if (
        response.status === 200 &&
        response.headers["content-type"].startsWith("image")
      ) {
        setUrl(promo.imageUrl);
      }
    } catch (error) {
      // console.error("Error occurred while checking image URL:", error);
    }
  }

  checkImageUrls(promo);

  function formatPrice(price) {
    return price
      ? price
          .toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })
          .slice(0, -3)
      : 0;
  }
  if (!url) {
    setUrl(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1714091131455-default-image.jpg"
    );
  }
  console.log(promo.price_discount);
  return (
    <>
      <Navbar />
      <div class="container my-3 br-3 p-3 rounded bg-primary-gradient">
        <div class="text-white border-start border-5 border-secondary fs-2 p-2 mb-3">
          Detail Promo
        </div>
        <div class="row row-cols-1 row-cols-md-1 g-4">
          <div class="col d-flex justify-content-center">
            <div class="card">
              <div class="row">
                <div class="col-md-6 justify-content-center d-flex align-items-center">
                  <img
                    class="img-fluid rounded"
                    src={url}
                    alt="Card image"
                  ></img>
                </div>
                <div class="col-md-6 mt-4" style={{ paddingLeft: "25px" }}>
                  <div class="card-body-right">
                    <div>
                      <h5 class="card-title">{promo.title}</h5>
                    </div>
                    <div
                      className="d-grid mb-5"
                      style={{ justifyItems: "start" }}
                    >
                      <span className="badge bg-soft-secondary p-2">
                        <span className="text-secondary fw-normal fs--1">
                          Kode Promo: <b>{promo.promo_code}</b>
                        </span>
                      </span>
                    </div>
                    <div class="text-dark">
                      <span>
                        <b>Ketentuan: </b>
                        {promo.terms_condition}
                      </span>
                    </div>
                    <div class="text-dark my-2">
                      <i>
                        Dapatkan Diskon Hingga
                        <b> {formatPrice(promo.promo_discount_price)} </b>
                        Setelah Total Pembelanjaan
                        <b> {formatPrice(promo.minimum_claim_price)} </b>
                      </i>
                    </div>
                    <p class="text-dark text-align-justify">
                      {promo.description}
                    </p>
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
