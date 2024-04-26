"use client";
import { useEffect, useState } from "react";
import useGetData from "@/services/useGetData";
import Link from "next/link";
import { formatDate } from "@/app/utils";
import useDelete from "@/services/useDelete";

export default function DataBanner() {
  const [banners, setBanners] = useState([]);
  const { getData } = useGetData();
  const { deleteData } = useDelete();

  useEffect(() => {
    getData("banners").then((res) => setBanners(res.data.data));
  }, []);

  const handleDelete = (id) => {
    const confirmed = confirm("Yakin Ingin Hapus Banner Ini ?");
    if (confirmed) {
      try {
        deleteData(`delete-banner/${id}`).then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Data Banner</h1>
          </div>
        </section>
        <div className="card card-body">
          <div className="table-responsive">
            <div
              id="table_data_banner_wrapper"
              className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer"
            >
              <div className="row">
                <div className="col-sm-12">
                  <Link
                    href={"/dashboard/banner/create"}
                    className="btn btn-primary mb-3 float-left mr-3"
                  >
                    Tambah Banner
                  </Link>
                  <table
                    className="table table-striped dataTable no-footer display"
                    id="table_data_banner"
                    role="grid"
                    aria-describedby="table_data_banner_info"
                  >
                    <thead>
                      <tr role="row">
                        <th
                          className="text-center sorting"
                          tabIndex="0"
                          aria-controls="table_data_banner"
                          style={{ width: "20px" }}
                          aria-label="#: activate to sort column ascending"
                        >
                          No
                        </th>
                        <th className="sorting">Nama</th>
                        <th className="sorting">Waktu Dibuat</th>
                        <th className="sorting">Waktu Diubah</th>
                        <th className="sorting">Gambar</th>
                        <th className="sorting" style={{ width: "100px" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {banners.map((banner, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{banner.name}</td>
                          <td>{formatDate(banner.createdAt)}</td>
                          <td>{formatDate(banner.updatedAt)}</td>
                          <td>
                            <img
                              src={banner.imageUrl}
                              style={{
                                width: "100px",
                                height: "60px",
                                objectFit: "cover",
                              }}
                            ></img>
                          </td>
                          <td>
                            <div className="row">
                              <a
                                href={`/dashboard/banner/${banner.id}`}
                                className="btn btn-sm btn-warning mr-2 ml-2"
                              >
                                <i className="fas fa-pencil-ruler"></i>
                              </a>
                              <button
                                onClick={() => handleDelete(banner.id)}
                                className="btn btn-sm btn-danger"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
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
