"use client";
import { useEffect, useState } from "react";
import getMethod from "@/utils/getMethod";
import postMethod from "@/utils/postMethod";
import uploadMethod from "@/utils/uploadMethod";

export default function DetailCategory({ params }) {
  const { GET } = getMethod();
  const { POST } = postMethod();
  const { UPLOAD} = uploadMethod();
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState({});
  const [tempImage, setTempImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [successStatus, setSuccessStatus] = useState(null);

  useEffect(() => {
    GET(`category/${params.id}`).then((res) => setCategory(res.data.data));
  }, []);
  const handleFileChange = async (e) => {
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
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (e.target.name.value === "") {
      setMessage("Isi Semua Data");
      setIsLoading(false);
      setSuccessStatus(false);
      return false;
    }
    console.log(category.imageUrl);
    const categoryData = {
      name: e.target.name.value,
      imageUrl: url ? url : category.imageUrl,
    };
    console.log("submit: ", categoryData);
    try {
      const res = await POST(`update-category/${params.id}`, categoryData);
      if (res.status === 200) {
        setIsLoading(false);
        setMessage("Berhasil Mengubah Kategori");
        setSuccessStatus(true);
      }
    } catch (error) {
      setMessage("Gagal Mengubah Kategori");
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
            <h1>Ubah Kategori</h1>
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
                src={tempImage ? tempImage : category.imageUrl}
                className="mb-4 rounded"
                style={{ maxWidth: "320px" }}
              ></img>
            </div>
            <div className="align-self-center col-md-9">
              <div className="form-group">
                <label htmlFor="">Nama:</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={category.name}
                  name="name"
                ></input>
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
