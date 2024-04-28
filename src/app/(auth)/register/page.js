"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../assets/admin/assets/css/style.css";
import "../../../assets/admin/assets/css/components.css";
import { useRouter } from "next/navigation";
import authMethod from "@/utils/authMethod";
import Link from "next/link";
import uploadMethod from "@/utils/uploadMethod";
// import "@/assets/admin/assets/css/custom.css";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [message, setMessage] = useState(null);
  const [url, setUrl] = useState("");
  const router = useRouter();
  const { AUTH } = authMethod();
  const {UPLOAD} = uploadMethod();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
    import("@/assets/user/fontawesome/all.min.js");
    import("@/assets/admin/assets/js/stisla.js");
    import("@/assets/admin/assets/js/scripts.js");
    import("@/assets/admin/assets/js/custom.js");
  }, []);


  const handleFileChange = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await UPLOAD("upload-image", formData);
      setMessage(null);
      setUrl(res.data.url);
      setIsLoading(false);
      console.log("url: ", res.data.url);
      return res.data.url;
    } catch (error) {
      setIsLoading(false);
      setMessage("Gagal Upload Gambar");
      setIsSuccess(false);
      console.log(error);
    }
  };
    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !e.target.email.value ||
      !e.target.name.value ||
      !e.target.password.value ||
      !e.target.passwordRepeat.value ||
      !url ||
      !e.target.phoneNumber.value
    ) {
      setMessage("Pastikan Semua Data Terisi");
      setIsLoading(false);
      setIsSuccess(false);
      return false;
    }

    e.preventDefault();
    const userData = {
      email: e.target.email.value,
      name: e.target.name.value,
      password: e.target.password.value,
      passwordRepeat: e.target.passwordRepeat.value,
      role: "admin",
      profilePictureUrl: url,
      phoneNumber: e.target.phoneNumber.value,
    };

    const res = await AUTH("register", userData);
    console.log(res);
    try {
      if (res.status === 200) {
        setTimeout(() => {
          setMessage("Berhasil Daftar");
          setIsLoading(false);
          setIsSuccess(true);
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      setMessage("Gagal Daftar, Silahkan Coba Lagi");
      console.log(error);
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  return (
    <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
      <div class="login-brand">
        <h2 class="text-primary">Jelajah</h2>
      </div>

      <div class="card card-primary">
        <div class="card-header">
          <h4>Daftar</h4>
        </div>
        <div class="card-body">
          {message ? (
            <div
              class={
                "alert alert-" +
                (isSuccess ? "success" : "danger") +
                " alert-dismissible fade show"
              }
              role="alert"
            >
              {message}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          ) : null}
          <form class="needs-validation" onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="name">Nama</label>
              <input
                id="name"
                type="text"
                class="form-control"
                name="name"
                tabindex="1"
                autofocus
              ></input>
              <div class="invalid-feedback">Masukkan Nama Anda</div>
            </div>{" "}
            <div class="row">
              <div className="col-md-4">
                <div class="form-group">
                  <div class="d-block">
                    <label for="profilePictureUrl" class="control-label">
                      URL Foto Profil
                    </label>
                  </div>
                  <input
                    id="profilePictureUrl"
                    type="file"
                    class="form-control"
                    name="profilePictureUrl"
                    onChange={handleFileChange}
                    tabindex="2"
                  ></input>
                  <div class="invalid-feedback">
                    Masukkan URL Foto Profil Anda
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    id="email"
                    type="text"
                    class="form-control"
                    name="email"
                    tabindex="1"
                    autofocus
                  ></input>
                  <div class="invalid-feedback">Masukkan Email Anda</div>
                </div>
              </div>
              <div className="col-md-4">
                <div class="form-group">
                  <label for="phoneNumber">No Telepon</label>
                  <input
                    id="phoneNumber"
                    type="text"
                    class="form-control"
                    name="phoneNumber"
                    tabindex="1"
                    autofocus
                  ></input>
                  <div class="invalid-feedback">Masukkan No Telepon Anda</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div class="form-group">
                  <div class="d-block">
                    <label for="password" class="control-label">
                      Kata Sandi
                    </label>
                  </div>
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    tabindex="2"
                  ></input>
                  <div class="invalid-feedback">Masukkan Kata Sandi Anda</div>
                </div>
              </div>
              <div className="col-md-6">
                <div class="form-group">
                  <div class="d-block">
                    <label for="passwordRepeat" class="control-label">
                      Ulangi Kata Sandi
                    </label>
                  </div>
                  <input
                    id="passwordRepeat"
                    type="password"
                    class="form-control"
                    name="passwordRepeat"
                    tabindex="2"
                  ></input>
                  <div class="invalid-feedback">
                    Masukkan Ulangi Kata Sandi Anda
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group justify-content-between d-flex">
              <Link href="/login" className="btn btn-success btn-lg">
                Login
              </Link>
              <button
                type="submit"
                className={
                  isLoading
                    ? "btn disabled btn-primary btn-progress"
                    : "btn btn-primary btn-lg"
                }
                tabindex="4"
              >
                {isLoading ? "" : "Daftar"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="simple-footer">Copyright &copy; Balrafa Tech 2024</div>
    </div>
  );
}
