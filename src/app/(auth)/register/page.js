"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/admin/assets/css/style.css";
import "@/assets/admin/assets/css/components.css";
import { useRouter } from "next/navigation";
import useAuth from "@/services/useAuth";
// import "@/assets/admin/assets/css/custom.css";

export default function RegisterPage() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
    import("@/assets/user/fontawesome/all.min.js");
    import("@/assets/admin/assets/js/stisla.js");
    import("@/assets/admin/assets/js/scripts.js");
    import("@/assets/admin/assets/js/custom.js");
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [message, setMessage] = useState(null);
  const router = useRouter();
  const { auth } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !e.target.email.value ||
      !e.target.name.value ||
      !e.target.password.value ||
      !e.target.passwordRepeat.value ||
      !e.target.profilePictureUrl.value ||
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
      profilePictureUrl: e.target.profilePictureUrl.value,
      phoneNumber: e.target.phoneNumber.value,
    };
    
    const res = await auth("register", userData);
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
                required
                autofocus
              ></input>
              <div class="invalid-feedback">Masukkan Nama Anda</div>
            </div>{" "}
            <div class="form-group">
              <div class="d-block">
                <label for="profilePictureUrl" class="control-label">
                  URL Foto Profil
                </label>
              </div>
              <input
                id="profilePictureUrl"
                type="text"
                class="form-control"
                name="profilePictureUrl"
                tabindex="2"
                required
              ></input>
              <div class="invalid-feedback">Masukkan URL Foto Profil Anda</div>
            </div>
            <div class="row">
              <div className="col-md-6">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    id="email"
                    type="text"
                    class="form-control"
                    name="email"
                    tabindex="1"
                    required
                    autofocus
                  ></input>
                  <div class="invalid-feedback">Masukkan Email Anda</div>
                </div>
              </div>
              <div className="col-md-6">
                <div class="form-group">
                  <label for="phoneNumber">No Telepon</label>
                  <input
                    id="phoneNumber"
                    type="text"
                    class="form-control"
                    name="phoneNumber"
                    tabindex="1"
                    required
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
                    required
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
                    required
                  ></input>
                  <div class="invalid-feedback">
                    Masukkan Ulangi Kata Sandi Anda
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <button
                type="submit"
                class="btn btn-primary btn-lg btn-block"
                tabindex="4"
              >
                Daftar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="simple-footer">Copyright &copy; Balrafa Tech 2024</div>
    </div>
  );
}
