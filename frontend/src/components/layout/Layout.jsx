import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-3 flex space-x-4">
          <Link href="/" className="font-semibold hover:underline">
            Inicio
          </Link>
          <Link href="/flats" className="font-semibold hover:underline">
            Pisos
          </Link>
          <Link href="/register" className="font-semibold hover:underline">
            Registro
          </Link>
          <Link
            href="/host/dashboard"
            className="font-semibold hover:underline"
          >
            Dashboard Anfitrión
          </Link>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
