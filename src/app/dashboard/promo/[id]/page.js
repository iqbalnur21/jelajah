"use client";
import { useEffect, useState } from "react";
import getMethod from "@/utils/getMethod";
import postMethod from "@/utils/postMethod";
import uploadMethod from "@/utils/uploadMethod";

export default function DetailPromo({ params }) {
  const { GET } = getMethod();
  const { POST } = postMethod();
  const { UPLOAD } = uploadMethod();
  const [url, setUrl] = useState("");
  const [promo, setPromo] = useState({});
  const [tempImage, setTempImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [successStatus, setSuccessStatus] = useState(null);

  useEffect(() => {
    GET(`promo/${params.id}`).then((res) => setPromo(res.data.data));
  }, []);
  const handleFileChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTempImage(URL.createObjectURL(event.target.files[0]));
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await UPLOAD("upload-image", formData);
      setUrl(res.data.url);
      setIsLoading(false);
      return res.data.url;
    } catch (error) {
      setIsLoading(false);
      setMessage("Gagal Upload Gambar");
      setSuccessStatus(false);
      window.scrollTo({top:0, behavior:'smooth'});
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      e.target.title.value === "" ||
      e.target.description.value === "" ||
      e.target.terms_condition.value === "" ||
      e.target.promo_code.value === "" ||
      e.target.promo_discount_price.value === "" ||
      e.target.minimum_claim_price.value === ""
    ) {
      setMessage("Isi Semua Data");
      setIsLoading(false);
      setSuccessStatus(false);
      window.scrollTo({top:0, behavior:'smooth'});
      return false;
    }
    console.log(promo.imageUrl);
    console.log(e.target.promo_discount_price.value);
    console.log(Number(e.target.promo_discount_price.value));
    const promoData = {
      title: e.target.title.value,
      description: e.target.description.value,
      terms_condition: e.target.terms_condition.value,
      promo_code: e.target.promo_code.value,
      promo_discount_price: Number(e.target.promo_discount_price.value),
      minimum_claim_price: Number(e.target.minimum_claim_price.value),
      imageUrl: url ? url : promo.imageUrl,
    };
    console.log("submit: ", promoData);
    try {
      const res = await POST(`update-promo/${params.id}`, promoData);
      if (res.status === 200) {
        setIsLoading(false);
        setMessage("Berhasil Mengubah Promo");
        setSuccessStatus(true);
        window.scrollTo({top:0, behavior:'smooth'});
      }
    } catch (error) {
      setMessage("Gagal Mengubah Promo");
      setSuccessStatus(false);
      setIsLoading(false);
      console.log(error);
      window.scrollTo({top:0, behavior:'smooth'});
    }
  };
  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Ubah Promo</h1>
          </div>
        </section>
        <form
          method="post"
          className="card card-body"
          onSubmit={(e) => handleSubmit(e)}
        >
          {message ? (
            <div
              className={
                "alert alert-" +
                (successStatus ? "success" : "danger") +
                " alert-dismissible fade show justify-content-between d-flex"
              }
              role="alert"
            >
              <span>
                {successStatus ? (
                  <strong>Success! </strong>
                ) : (
                  <strong>Error! </strong>
                )}
                {message}
              </span>
              <button
                type="button"
                className="bg-transparent border-0"
                onClick={() => setMessage(null)}
                data-bs-dismiss="alert"
                aria-label="Close"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          ) : null}
          <div className="row">
            <div className="align-self-center col-md-3">
              <img
                src={tempImage ? tempImage : promo.imageUrl}
                className="mb-4 rounded"
                style={{ maxWidth: "320px" }}
              ></img>
            </div>
            <div className="align-self-center col-md-9">
              <div className="form-group">
                <label htmlFor="">Judul</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={promo.title}
                  name="title"
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="">Gambar</label>
                <input
                  type="file"
                  className="form-control"
                  name="imageUrl"
                  onChange={handleFileChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="">Kode Promo</label>
                <input
                  type="text"
                  className="form-control"
                  name="promo_code"
                  defaultValue={promo.title}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="">Harga Diskon</label>
                <input
                  type="number"
                  className="form-control"
                  name="promo_discount_price"
                  defaultValue={promo.promo_discount_price}
                ></input>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="">Minimal Belanja</label>
                <input
                  type="number"
                  className="form-control"
                  name="minimum_claim_price"
                  defaultValue={promo.minimum_claim_price}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="">Syarat Dan Ketentuan</label>
                <textarea
                  style={{ height: "150px" }}
                  type="text"
                  className="form-control"
                  name="terms_condition"
                  defaultValue={
                    promo.terms_condition
                      ? promo.terms_condition
                          .replace(/<p>/g, "")
                          .replace(/<\/p>/g, "")
                      : ""
                  }
                ></textarea>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="">Deskripsi</label>
                <textarea
                  style={{ height: "150px" }}
                  type="text"
                  className="form-control"
                  name="description"
                  defaultValue={promo.description}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="row col-md-6">
            <a
              href="/dashboard/promo"
              className="btn btn-danger mt-4 mr-2 float-center"
            >
              Kembali
            </a>
            <button
              type="submit"
              className={
                isLoading
                  ? "btn disabled btn-success btn-progress mt-4 float-center"
                  : "btn btn-success mt-4 float-center"
              }
            >
              {isLoading ? "" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
