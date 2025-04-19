// src/components/FlatItem.jsx
import Link from 'next/link';

export default function FlatItem({ flat }) {
  return (
    <div className="border rounded p-4 mb-4 bg-white shadow">
      {/* Sólo el título, como enlace */}
      <Link
        href={`/flats/${flat.id}`}
        className="block text-xl font-semibold hover:underline"
      >
        {flat.title}
      </Link>
    </div>
  );
}
