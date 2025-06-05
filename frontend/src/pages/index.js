// frontend/src/pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-4">
        Bienvenido a Erasmus Flatshare
      </h1>
      <p className="mb-6 text-lg">
        Encuentra y gestiona alojamientos para tu experiencia Erasmus.
      </p>
      <Link
        href="/flats"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
      >
        Ver Pisos Disponibles
      </Link>
    </div>
  );
}
