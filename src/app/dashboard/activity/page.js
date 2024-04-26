"use client";
import { useEffect, useState } from "react";
import getMethod from "@/utils/getMethod";
import Link from "next/link";
import {formatPrice } from "@/utils";
import useDelete from "@/services/useDelete";

export default function DataActivity() {
  const [activities, setActivities] = useState([]);
  const { GET } = getMethod();
  const { deleteData } = useDelete();

  useEffect(() => {
    GET("activities").then((res) => setActivities(res.data.data));
  }, []);

  const handleDelete = (id) => {
    const confirmed = confirm("Yakin Ingin Hapus Activity Ini ?");
    if (confirmed) {
      try {
        deleteData(`delete-activity/${id}`).then((res) => {
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
            <h1>Data Activity</h1>
          </div>
        </section>
        <div className="card card-body">
          <div className="table-responsive">
            <div
              id="table_data_wrapper"
              className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer"
            >
              <div className="row">
                <div className="col-sm-12">
                  <Link
                    href={"/dashboard/activity/create"}
                    className="btn btn-primary mb-3 float-left mr-3"
                  >
                    Tambah Activity
                  </Link>
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
                        <th className="sorting">Judul</th>
                        <th className="sorting">Harga</th>
                        <th className="sorting">Harga Diskon</th>
                        <th className="sorting">Rating</th>
                        <th className="sorting">Fasilitas</th>
                        <th className="sorting">Alamat</th>
                        <th className="sorting">Tempat</th>
                        <th className="sorting">Kategori</th>
                        <th className="sorting">Deskripsi</th>
                        <th className="sorting">Gambar</th>
                        <th className="sorting" style={{ width: "60px" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map((activity, key) => {
                        return (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{activity.title}</td>
                          <td>{formatPrice(activity.price)}</td>
                          <td>{formatPrice(activity.price_discount)}</td>
                          <td>{activity.rating}/5 ({activity.total_reviews})</td>
                          <td>{activity.facilities}</td>
                          <td>{activity.address}</td>
                          <td>{activity.province}, {activity.city}</td>
                          <td>{activity.category.name}</td>
                          <td>{activity.description}</td>
                          <td>
                            <img
                              src={activity.imageUrls[0]}
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
                                href={`/dashboard/activity/${activity.id}`}
                                className="btn btn-sm btn-warning mr-2 ml-2"
                              >
                                <i className="fas fa-pencil-ruler"></i>
                              </a>
                              <button
                                onClick={() => handleDelete(activity.id)}
                                className="btn btn-sm btn-danger"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      )})}
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
