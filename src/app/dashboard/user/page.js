"use client";
import { useEffect, useState } from "react";
import getMethod from "@/utils/getMethod";
import Link from "next/link";
import { checkImageUrl, formatDate } from "@/utils";
import useDelete from "@/services/useDelete";
import axios from "axios";
import useUpdate from "@/services/useUpdate";

export default function DataUser() {
  const [users, setUsers] = useState([]);
  const { update } = useUpdate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [successStatus, setSuccessStatus] = useState(null);
  const { GET } = getMethod();
  useEffect(() => {
    GET("all-user")
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  function checkImageUrl(imageUrl) {
    console.log(imageUrl);
    if (imageUrl) {
      return imageUrl.includes("http") && !imageUrl.includes("twitter")
        ? imageUrl
        : "https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png";
    } else {
      return "https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png";
    }
  }
  const handleChangeRole = async (id) => {
    setIsLoading(true);
    const confirmed = confirm("Yakin Ubah Role User Ini ke Admin ?");
    if (confirmed) {
      try {
        const res = await update(`update-user-role/${id}`, {
          role: "admin",
        });
        if (res.status === 200) {
          setTimeout(() => {
            setIsLoading(false);
            setMessage("Berhasil Mengubah Role User ke Admin");
            setSuccessStatus(true);
            window.location.reload();
          }, 5000);
        }
      } catch (error) {
        setMessage("Gagal Mengubah Role User ke Admin");
        setSuccessStatus(false);
        setIsLoading(false);
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Data User</h1>
          </div>
        </section>
        <div className="card card-body">
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
          <div className="table-responsive">
            <div
              id="table_data_wrapper"
              className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer"
            >
              <div className="row">
                <div className="col-sm-12">
                  <table
                    className="table table-striped dataTable no-footer display"
                    id="table_data"
                    role="grid"
                    aria-describedby="table_data_info"
                  >
                    <thead>
                      <tr role="row">
                        <th
                          className="text-center sorting"
                          tabIndex="0"
                          aria-controls="table_data"
                          style={{ width: "20px" }}
                          aria-label="#: activate to sort column ascending"
                        >
                          No
                        </th>
                        <th className="sorting">Nama</th>
                        <th className="sorting">Email</th>
                        <th className="sorting">No HP</th>
                        <th className="sorting">Role</th>
                        <th className="sorting">Foto Profil</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phoneNumber}</td>
                          <td>
                            {user.role == "admin" ? (
                              "Admin"
                            ) : (
                              <button
                                onClick={() => handleChangeRole(user.id)}
                                className="btn btn-sm btn-primary"
                              >
                                <i className="fas fa-user"></i> Ubah ke Admin
                              </button>
                            )}
                          </td>
                          <td>
                            <img
                              src={checkImageUrl(user.profilePictureUrl)}
                              alt=""
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                              }}
                            ></img>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
