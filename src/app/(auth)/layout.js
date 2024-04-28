"use client";
import { useRouter } from "next/navigation";

export default function AuthLAyout({ children }) {
  const router = useRouter();

  if(localStorage.getItem("token")) {
    router.push("/dashboard");
  }

  return (
    <>
      <section class="section">
        <div class="container mt-5">
          <div class="row">{children}</div>
        </div>
      </section>
    </>
  );
}
