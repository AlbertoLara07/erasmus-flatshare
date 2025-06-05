// src/components/FlatItem.jsx
import Link from 'next/link';

export default function FlatItem({ flat }) {
  return (
    <div className="border rounded p-4 mb-4 bg-white shadow">
      <Link
        href={`/flats/${flat.id}`}
        className="block text-xl font-semibold hover:underline"
      >
        {flat.title}
      </Link>
      {flat.description && (
        <p className="text-gray-700 mt-1 line-clamp-2">{flat.description}</p>
      )}
      <p className="font-medium mt-1">{flat.price} €/mes</p>
    </div>
  );
}
