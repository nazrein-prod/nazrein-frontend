export default async function UserDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user = await fetchUserDetails();
  // if (!user) {
  //   redirect("/");
  // }

  return <div className="w-full">{children}</div>;
}
