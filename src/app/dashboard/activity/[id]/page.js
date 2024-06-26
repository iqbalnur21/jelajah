"use client";
import { useEffect, useState } from "react";
import postMethod from "@/utils/postMethod";
import getMethod from "@/utils/getMethod";
import { formatPrice } from "@/utils";
import uploadMethod from "@/utils/uploadMethod";

export default function DetailActivity({ params }) {
  const { GET } = getMethod();
  const { POST } = postMethod();
  const { UPLOAD } = uploadMethod();
  const [categories, setCategories] = useState([]);
  const [url, setUrl] = useState("");
  const [map, setMap] = useState("");
  const [activity, setActivity] = useState({});
  const [tempImage, setTempImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [successStatus, setSuccessStatus] = useState(null);

  useEffect(() => {
    GET("categories").then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  useEffect(() => {
    GET(`activity/${params.id}`).then((res) => {
      return setActivity(res.data.data);
    });
  }, []);

  const handleFileChange = async (e) => {
    setIsLoading(true);
    try {
      setTempImage(URL.createObjectURL(event.target.files[0]));
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const res = await UPLOAD("upload-image", formData);
      setUrl(res.data.url);
      setIsLoading(false);
      return res.data.url;
    } catch (error) {
      setIsLoading(false);
      setMessage("Gagal Upload Gambar");
      setSuccessStatus(false);
      console.log(error);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const handleMapUrlChange = async (e) => {
    const value = e.target.value;
    console.log(value);
    try {
      let iframe = document.querySelector("iframe");
      if (iframe) {
        setMap(value);
      }
      return value;
    } catch (error) {
      setMessage("Gagal Menentukan Pin");
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      e.target.categoryId.value === "" ||
      e.target.title.value === "" ||
      e.target.description.value === "" ||
      (url ? url : activity.imageUrls) === "" ||
      e.target.price.value === "" ||
      e.target.price_discount.value === "" ||
      e.target.rating.value === "" ||
      e.target.total_reviews.value === "" ||
      e.target.facilities.value === "" ||
      e.target.address.value === "" ||
      e.target.city.value === "" ||
      e.target.province.value === "" ||
      e.target.location_maps.value === ""
    ) {
      setMessage("Isi Semua Data");
      setIsLoading(false);
      setSuccessStatus(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return false;
    }
    try {
      const dataActivity = {
        categoryId: e.target.categoryId.value,
        title: e.target.title.value,
        location_maps: e.target.location_maps.value,
        description: e.target.description.value,
        price_discount: Number(e.target.price_discount.value),
        price: Number(e.target.price.value),
        total_reviews: Number(e.target.total_reviews.value),
        rating: Number(e.target.rating.value),
        imageUrls: url ? [url] : activity.imageUrls,
        facilities: e.target.facilities.value,
        address: e.target.address.value,
        city: e.target.city.value,
        province: e.target.province.value,
      };
      console.log("submit: ", dataActivity);
      try {
        const res = await POST(`update-activity/${params.id}`, dataActivity);
        if (res.status === 200) {
          setIsLoading(false);
          setMessage("Berhasil Mengubah Aktivitas");
          setSuccessStatus(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } catch (error) {
        setMessage("Gagal Mengubah Aktivitas");
        setSuccessStatus(false);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        console.log(error);
      }
    } catch (error) {
      setMessage("Kesalahan Saat Menampung Data");
      setSuccessStatus(false);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.log(error);
    }
  };

  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Ubah Aktivitas</h1>
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
            <div className="align-self-center text-center col-md-6">
              <img
                src={tempImage ? tempImage : activity.imageUrls}
                className="mb-4 rounded"
                style={{ maxWidth: "400px" }}
              ></img>
            </div>

            <div className="align-self-center text-center col-md-6">
              {map ? (
                <>
                  <iframe
                    srcDoc={url}
                    width={400}
                    height={300}
                    frameBorder="0"
                    scrolling="no"
                    title="Maps"
                    style={{ border: "none" }}
                    allowFullScreen
                  ></iframe>
                </>
              ) : (
                <>
                  <iframe
                    srcDoc={activity.location_maps}
                    width={400}
                    height={300}
                    frameBorder="0"
                    scrolling="no"
                    title="Maps"
                    style={{ border: "none" }}
                    allowFullScreen
                  ></iframe>
                </>
              )}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="">Gambar</label>
              <input
                type="file"
                className="form-control"
                name="imageUrl"
                onChange={handleFileChange}
              ></input>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="">Link iframe Lokasi Map</label>
              <input
                type="text"
                className="form-control"
                defaultValue={activity.location_maps}
                onChange={handleMapUrlChange}
                name="location_maps"
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label htmlFor="">Judul</label>
              <input
                type="text"
                className="form-control"
                defaultValue={activity.title}
                name="title"
              ></input>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-3">
              <label htmlFor="">Harga</label>
              <input
                type="number"
                className="form-control"
                defaultValue={activity.price}
                name="price"
              ></input>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="">Harga Diskon</label>
              <input
                type="number"
                className="form-control"
                defaultValue={activity.price_discount}
                name="price_discount"
              ></input>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="">Rating (Max. 5)</label>
              <input
                type="number"
                className="form-control"
                defaultValue={activity.rating}
                name="rating"
              ></input>
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="">Total Review</label>
              <input
                type="number"
                className="form-control"
                defaultValue={activity.total_reviews}
                name="total_reviews"
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="">Fasilitas</label>
              <input
                type="text"
                className="form-control"
                defaultValue={activity.facilities}
                name="facilities"
              ></input>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="">Kategori</label>
              <select
                className="form-control"
                defaultValue={activity.categoryId ? activity.categoryId : null}
                name="categoryId"
              >
                <option>Select</option>
                {categories.map((category) => {
                  return (
                    <option
                      key={category.id}
                      value={category.id}
                      selected={category.id === activity.categoryId}
                    >
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="">Provinsi</label>
              <input
                type="text"
                className="form-control"
                defaultValue={activity.province}
                name="province"
              ></input>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="">Kota</label>
              <input
                type="text"
                className="form-control"
                defaultValue={activity.city}
                name="city"
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="">Alamat Lengkap</label>
              <textarea
                style={{ height: "150px" }}
                type="text"
                className="form-control"
                name="address"
                defaultValue={activity.address}
              ></textarea>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="">Deskripsi</label>
              <textarea
                style={{ height: "150px" }}
                type="text"
                className="form-control"
                name="description"
                defaultValue={activity.description}
              ></textarea>
            </div>
          </div>
          <div className="row col-md-6">
            <a
              href="/dashboard/activity"
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
