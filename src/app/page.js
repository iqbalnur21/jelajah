"use client"
import { useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/user/Navbar";
import Banner from "@/components/user/Banner";
import ListPromo from "@/components/user/ListPromo";
import ListCategory from "@/components/user/ListCategory";
import ListActivities from "@/components/user/ListActivities";
import Footer from "@/components/user/Footer";
import "@/assets/user/css/custom.css";
import "@/assets/user/css/theme.css";


export default function Home() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
    import("@/assets/user/fontawesome/all.min.js");
    import("@/assets/user/js/theme.js");
  }, []);

  return (
    <main className="main" id="top">
      <Navbar />
      <Banner />
      <ListPromo />
      <ListCategory />
      <ListActivities />
      <Footer />
    </main>
  );
}
