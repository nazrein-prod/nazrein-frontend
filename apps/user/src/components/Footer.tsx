export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="text-sm ">
            © {new Date().getFullYear()} nazrein. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
