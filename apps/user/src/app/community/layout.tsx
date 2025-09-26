export default function CommunityPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex flex-col flex-1 w-full">{children}</div>;
}
