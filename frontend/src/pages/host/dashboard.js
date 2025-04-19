// frontend/src/pages/host/dashboard.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function HostDashboard() {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // 1) Leer userId SOLO en el cliente
  useEffect(() => {
    const id = typeof window !== 'undefined' 
      ? localStorage.getItem('userId') 
      : null;
    setUserId(id);
  }, []);

  // 2) Cuando ya tengamos userId, cargamos los pisos del host
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    async function fetchFlats() {
      try {
        const res = await axios.get('http://localhost:5000/api/flats');
        const myFlats = res.data.filter(f => String(f.host_id) === userId);
        setFlats(myFlats);
      } catch (err) {
        console.error('Error al cargar tus pisos:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchFlats();
  }, [userId]);

  if (loading) {
    return <p className="text-center mt-10">Cargando tu dashboard…</p>;
  }
  if (!userId) {
    return (
      <p className="text-center mt-10">
        Debes{' '}
        <Link href="/register" className="text-blue-500 underline">
          registrarte
        </Link>{' '}
        para ver tu dashboard.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Tu Dashboard de Anfitrión</h1>
      {flats.length === 0 ? (
        <p className="text-center">No has publicado ningún piso aún.</p>
      ) : (
        flats.map(flat => (
          <div key={flat.id} className="border rounded p-4 mb-4 bg-white shadow">
            <h2 className="text-xl font-semibold mb-2">{flat.title}</h2>
            <Link 
              href={`/host/flats/${flat.id}`} 
              className="text-blue-500 underline"
            >
              Ver y gestionar reservas
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
