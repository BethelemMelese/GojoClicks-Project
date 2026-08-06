export default function AdminLoginLayout({ children }) {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-[#f3f3f3]">
      <div className="mx-auto flex min-h-full max-w-lg items-center px-4 py-10">
        {children}
      </div>
    </div>
  );
}
