"use client";
import { useEffect, useState } from "react";
import "@/assets/admin/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@/assets/admin/node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/admin/assets/css/style.css";
import "@/assets/admin/assets/css/components.css";
import Link from "next/link";
import useAuth from "@/services/useAuth";

export default function DashboardLayout({ children }) {
  const { userLog } = useAuth();
  const [user, setUser] = useState({});
  useEffect(() => {
    userLog("user", (res) => {
      setUser(res);
    });
    import("@/assets/admin/node_modules/jquery/dist/jquery.min.js");
    import("@/assets/admin/node_modules/popper.js/dist/popper.js");
    import("@/assets/admin/node_modules/tooltip.js/dist/tooltip.js");
    import("@/assets/admin/node_modules/bootstrap/dist/js/bootstrap.min.js");
    import(
      "@/assets/admin/node_modules/nicescroll/dist/jquery.nicescroll.min.js"
    );
    // import("@/assets/admin/node_modules/moment/min/moment.min.js");
    import("@/assets/admin/assets/js/stisla.js");
    import("@/assets/admin/node_modules/sweetalert/dist/sweetalert.min.js");
    import("@/assets/admin/assets/js/page/modules-sweetalert.js");
    import("@/assets/admin/assets/js/scripts.js");
    import("@/assets/admin/assets/js/custom.js");
  }, []);

  function handleLogout() {
   
    // localStorage.removeItem("token");
  }
  return (
    <div className="main-wrapper">
      <div className="navbar-bg"></div>
      <nav className="navbar navbar-expand-lg main-navbar justify-content-end">
        <ul className="navbar-nav navbar-right">
          <li className="dropdown">
            <a
              href="#"
              data-toggle="dropdown"
              className="nav-link dropdown-toggle nav-link-lg nav-link-user"
              aria-expanded="false"
            >
              <img
                style={{ objectFit: "cover", width: "50px", height: "50px" }}
                alt="image"
                src={user.profilePictureUrl}
                className="rounded-circle mr-3"
              ></img>
              <div
                className="d-sm-none d-lg-inline-block"
                style={{ fontSize: "20px" }}
              >
                Hi, {user.name}
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="dropdown-title">Menu</div>
              <a
                href="/dashboard/profile"
                className="dropdown-item has-icon"
              >
                <i className="fas fa-user"></i> Profile
              </a>
              <a
                className="dropdown-item has-icon text-danger"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
      <div className="main-sidebar ">
        <aside id="sidebar-wrapper">
          <div className="sidebar-brand">
            <a href="/dashboard">ADMIN JELAJAH</a>
          </div>
          <div className="sidebar-brand sidebar-brand-sm">
            <a href="/dashboard">KBRI</a>
          </div>
          <ul className="sidebar-menu">
            <li className="menu-header">Dashboard</li>
            <li>
              <a className="nav-link" href="/dashboard">
                <i className="fas fa-tachometer-alt"></i> <span>Dashboard</span>
              </a>
            </li>

            <li className="menu-header">Menu</li>
            <li>
              <Link className="nav-link" href={`/dashboard/user`}>
                <i className="fas fa-users"></i> <span>Data User</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" href={`/dashboard/banner`}>
                <i className="fas fa-window-restore"></i> <span>Data Banner</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" href={`/dashboard/promo`}>
                <i className="fas fa-tag"></i> <span>Data Promo</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" href={`/dashboard/category`}>
                <i className="fas fa-list"></i> <span>Data Kategori</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" href={`/dashboard/activity`}>
                <i className="fas fa-hiking"></i> <span>Data Aktivitas</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" href={`/dashboard/profile`}>
                <i className="fas fa-user"></i> <span>Profile</span>
              </Link>
            </li>
            <li>
              <a
                onClick={handleLogout}
                className="nav-link"
                href="<?php echo site_url('auth/logout') ?>"
              >
                <i className="fas fa-sign-out-alt text-danger"></i>{" "}
                <span className="text-danger">Logout</span>
              </a>
            </li>
          </ul>
        </aside>
      </div>
      {children}
      <footer className="main-footer">
        <div className="footer-left">
          Copyright &copy; 2024 <div className="bullet"></div> Design By{" "}
          <a href="https://balrafa.tech" target="_blank">
            Balrafa Tech
          </a>
        </div>
        <div className="footer-right">2.3.0</div>
      </footer>
    </div>
  );
}
