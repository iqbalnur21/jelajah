"use client";
import { useEffect, useState } from "react";
import getMethod from "@/utils/getMethod";
import useCreate from "@/services/useCreate";
import useUpload from "@/services/useUpload";

export default function CreateCategory() {
  const { GET } = getMethod();
  const { create } = useCreate();
  const { upload } = useUpload();
  const [url, setUrl] = useState("");
  const [tempImage, setTempImage] = useState(
    "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1714091131455-default-image.jpg"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [successStatus, setSuccessStatus] = useState(null);

  const handleFileChange = async (e) => {
    setIsLoading(true);
    setTempImage(URL.createObjectURL(event.target.files[0]));
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await upload("upload-image", formData);
      setMessage(null);
      setUrl(res.data.url);
      setIsLoading(false);
      console.log("url: ", res.data.url);
      return res.data.url;
    } catch (error) {
      setIsLoading(false);
      setMessage("Gagal Upload Gambar");
      setSuccessStatus(false);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (e.target.name.value === "" || url === "") {
      setIsLoading(false);
      setMessage("Isi Semua Data");
      setSuccessStatus(false);
      return false;
    }
    const categoryData = {
      name: e.target.name.value,
      imageUrl: url,
    };
    console.log("submit: ", categoryData);
    try {
      const res = await create(`create-category`, categoryData);
      if (res.status === 200) {
        setTimeout(() => {
          setIsLoading(false);
          setMessage("Berhasil Menambah Kategori");
          setSuccessStatus(true);
          router.push("/dashboard/category");
        }, 3000);
      }
    } catch (error) {
      setMessage("Gagal Menambah Kategori");
      setSuccessStatus(false);
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Tambah Category</h1>
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
                src={tempImage}
                className="mb-4 rounded"
                style={{ maxWidth: "320px" }}
              ></img>
            </div>
            <div className="align-self-center col-md-9">
              <div className="form-group">
                <label htmlFor="">Nama:</label>
                <input type="text" className="form-control" name="name"></input>
              </div>
              <div className="form-group">
                <label htmlFor="">Gambar:</label>
                <input
                  type="file"
                  className="form-control"
                  name="imageUrl"
                  onChange={handleFileChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="row col-md-6">
            <a
              href="/dashboard/category"
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
