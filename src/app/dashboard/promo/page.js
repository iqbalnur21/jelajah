"use client";
import { useEffect, useState } from "react";
import getMethod from "@/utils/getMethod";
import Link from "next/link";
import {formatPrice } from "@/utils";
import deleteMethod from "@/utils/deleteMethod";

export default function DataPromo() {
  const [promos, setPromos] = useState([]);
  const { GET } = getMethod();
  const { DELETE } = deleteMethod();

  useEffect(() => {
    GET("promos").then((res) => setPromos(res.data.data));
  }, []);

  const handleDelete = (id) => {
    const confirmed = confirm("Yakin Ingin Hapus Promo Ini ?");
    if (confirmed) {
      try {
        DELETE(`delete-promo/${id}`).then((res) => {
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
            <h1>Data Promo</h1>
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
                    href={"/dashboard/promo/create"}
                    className="btn btn-primary mb-3 float-left mr-3"
                  >
                    Tambah Promo
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
                        <th className="sorting">Kode Promo</th>
                        <th className="sorting">Harga Diskon</th>
                        <th className="sorting">Minimal Belanja</th>
                        <th className="sorting">Syarat</th>
                        <th className="sorting">Deskripsi</th>
                        <th className="sorting">Gambar</th>
                        <th className="sorting" style={{ width: "60px" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {promos.map((promo, key) => {
                        return (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{promo.title}</td>
                          <td>{promo.promo_code}</td>
                          <td>{formatPrice(promo.promo_discount_price)}</td>
                          <td>{formatPrice(promo.minimum_claim_price)}</td>
                          <td>{promo.terms_condition}</td>
                          <td>{promo.description}</td>
                          <td>
                            <img
                              src={promo.imageUrl}
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
                                href={`/dashboard/promo/${promo.id}`}
                                className="btn btn-sm btn-warning mr-2 ml-2"
                              >
                                <i className="fas fa-pencil-ruler"></i>
                              </a>
                              <button
                                onClick={() => handleDelete(promo.id)}
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
