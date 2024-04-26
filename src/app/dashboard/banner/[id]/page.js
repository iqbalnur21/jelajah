"use client";
import { useEffect, useState } from "react";
import useGetData from "@/services/useGetData";
import useUpdate from "@/services/useUpdate";
import useUpload from "@/services/useUpload";

export default function DetailBanner({ params }) {
  const { getData } = useGetData();
  const { update } = useUpdate();
  const { upload } = useUpload();
  const [url, setUrl] = useState("");
  const [banner, setBanner] = useState({});
  const [tempImage, setTempImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [successStatus, setSuccessStatus] = useState(null);

  useEffect(() => {
    getData(`banner/${params.id}`).then((res) => setBanner(res.data.data));
  }, []);
  const handleFileChange = async (e) => {
    setIsLoading(true);
    setTempImage(URL.createObjectURL(event.target.files[0]));
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await upload("upload-image", formData);
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
    console.log(banner.imageUrl);
    const bannerData = {
      name: e.target.name.value,
      imageUrl: url ? url : banner.imageUrl,
    };
    console.log("submit: ", bannerData);
    try {
      const res = await update(`update-banner/${params.id}`, bannerData);
      if (res.status === 200) {
        setIsLoading(false);
        setMessage("Berhasil Mengubah Banner");
        setSuccessStatus(true);
      }
    } catch (error) {
      setMessage("Gagal Mengubah Banner");
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
            <h1>Ubah Banner</h1>
          </div>
        </section>
        <form
          method="post"
          className="card card-body"
          onSubmit={(e) => handleSubmit(e)}
        >
          <img
            src={tempImage ? tempImage : banner.imageUrl}
            className="mb-4 rounded"
          ></img>
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
            <div className="col-md-6 form-group">
              <label htmlFor="">Nama:</label>
              <input
                type="text"
                className="form-control"
                defaultValue={banner.name}
                name="name"
              ></input>
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="">Gambar:</label>
              <input
                type="file"
                className="form-control"
                name="imageUrl"
                onChange={handleFileChange}
              ></input>
            </div>
          </div>
          <div className="row col-md-6">
            <a
              href="/dashboard/banner"
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
