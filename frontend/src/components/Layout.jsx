import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-600 text-white p-4">
        <nav aria-label="Principal" className="flex gap-4">
          <Link href="/flats" className="hover:underline">Pisos</Link>
          <Link href="/register" className="hover:underline">Registrarse</Link>
          <Link href="/host/dashboard" className="hover:underline">Dashboard</Link>
        </nav>
      </header>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
