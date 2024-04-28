"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../assets/admin/assets/css/style.css";
import "../../../assets/admin/assets/css/components.css";
import { useRouter } from "next/navigation";
import authMethod from "@/utils/authMethod";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/UserLoggedSlice";
import Link from "next/link";
// import "@/assets/admin/assets/css/custom.css";

export default function LoginPage() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
    import("@/assets/user/fontawesome/all.min.js");
    import("@/assets/admin/assets/js/stisla.js");
    import("@/assets/admin/assets/js/scripts.js");
    import("@/assets/admin/assets/js/custom.js");
  }, []);

  const router = useRouter();
  const { AUTH} = authMethod();
  const { userLoginStatus} = authMethod();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!e.target.email.value || !e.target.password.value) {
      setMessage("Email Dan Password Tidak Boleh Kosong");
      setIsLoading(false);
      setIsSuccess(false);
      return false;
    }

    e.preventDefault();
    const userData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await AUTH("login", userData);
      if (res.status === 200) {
        getUserLogged();
        setTimeout(() => {
          setMessage(null);
          setIsLoading(false);
          setIsSuccess(true);
          router.push("/dashboard");
        }, 2000);
      }
    } catch (error) {
      setMessage("Email Atau Password Salah, Silahkan Coba Lagi");
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  const getUserLogged = () => {
    if (localStorage.getItem("token")) {
      userLoginStatus("user", (res) => dispatch(setUser(res)));
    }
  };

  return (
    <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
      <div className="login-brand">
        <h2 className="text-primary">Jelajah</h2>
      </div>

      <div className="card card-primary">
        <div className="card-header">
          <h4>Login</h4>
        </div>
        <div className="card-body">
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
          <form className="needs-validation" onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                type="text"
                className="form-control"
                name="email"
                tabindex="1"
                required
                autofocus
              ></input>
              <div className="invalid-feedback">Masukkan Email Anda</div>
            </div>

            <div className="form-group">
              <div className="d-block">
                <label for="password" className="control-label">
                  Password
                </label>
              </div>
              <input
                id="password"
                type="password"
                className="form-control"
                name="password"
                tabindex="2"
              ></input>
              <div className="invalid-feedback">Masukkan Password Anda</div>
            </div>
            <div className="justify-content-between d-flex">
              <Link
                href="/register"
                className="btn btn-success btn-lg"
              >
                Daftar
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
                Login
              </button>
            </div>
            <div className="form-group text-center"></div>
          </form>
        </div>
      </div>
      <div className="simple-footer">Copyright &copy; Balrafa Tech 2024</div>
    </div>
  );
}
