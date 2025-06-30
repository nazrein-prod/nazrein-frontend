// import { getAllVideoRequestData } from "@/lib/getAllVideoRequests";
// import { redirect } from "next/navigation";

export default async function AdminLayoutPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const data = await getAllVideoRequestData();
  // if (!data) {
  //   redirect("/");
  // }

  return <div>{children}</div>;
}
