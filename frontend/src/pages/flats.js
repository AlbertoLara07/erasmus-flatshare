// src/pages/flats.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import FlatList from '../components/FlatList';

export default function FlatsPage() {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlats() {
      try {
        const res = await axios.get('http://localhost:5000/api/flats');
        setFlats(res.data);
      } catch (err) {
        console.error('Error al cargar pisos:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchFlats();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Cargando pisos…</p>;
  }

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold text-center mt-10">Pisos disponibles</h1>
      <FlatList flats={flats} />
    </div>
  );
}
