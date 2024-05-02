"use client";
import getMethod from "@/utils/getMethod";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [bannersLength, setBannersLength] = useState(0);
  const [usersLength, setUsersLength] = useState(0);
  const [activitiesLength, setActivitiesLength] = useState(0);
  const [promosLength, setPromosLength] = useState(0);
  const { GET } = getMethod();
  useEffect(() => {
    GET("banners").then((res) => setBannersLength(res.data.data.length));
    GET("all-user").then((res) => setUsersLength(res.data.data.length));
    GET("activities").then((res) => setActivitiesLength(res.data.data.length));
    GET("promos").then((res) => setPromosLength(res.data.data.length));
  }, []);
  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Dashboard</h1>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card card-statistic-1">
                <div className="card-icon bg-danger">
                  <i className="fas fa-users"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header"></div>
                  <h6>Total User</h6>
                  <div className="card-body">
                    {usersLength ? usersLength + " User" : "Loading..."}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-statistic-1">
                <div className="card-icon bg-success">
                  <i className="fas fa-window-restore"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header"></div>
                  <h6>Total Banner</h6>
                  <div className="card-body">
                    {bannersLength ? bannersLength + " Banner" : "Loading..."}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card card-statistic-1">
                <div className="card-icon bg-info">
                  <i className="fas fa-tag"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header"></div>
                  <h6>Total Promo</h6>
                  <div className="card-body">
                    {promosLength ? promosLength + " Promo" : "Loading..."}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-statistic-1">
                <div className="card-icon bg-primary">
                  <i className="fas fa-hiking"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header"></div>
                  <h6>Total Aktivitas</h6>
                  <div className="card-body">
                    {activitiesLength
                      ? activitiesLength + " Aktivitas"
                       : "Loading..."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
