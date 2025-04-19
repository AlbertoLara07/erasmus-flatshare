// src/components/FlatList.jsx
import React from 'react';
import FlatItem from './FlatItem';

export default function FlatList({ flats }) {
  if (!flats.length) {
    return <p className="text-center mt-10">No hay pisos publicados todavía.</p>;
  }
  return (
    <div className="max-w-2xl mx-auto mt-10">
      {flats.map(flat => (
        <FlatItem key={flat.id} flat={flat} />
      ))}
    </div>
  );
}
