"use client";

import { env } from "next-runtime-env";

export default function page() {
  console.log(env("NEXT_PUBLIC_BACKEND_URL"));
  console.log(env("NEXT_PUBLIC_ORIGIN"));
  console.log(env("NEXT_PUBLIC_ADMIN_ORIGIN"));

  return <div>testing page</div>;
}
