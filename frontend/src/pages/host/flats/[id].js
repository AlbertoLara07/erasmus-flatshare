// frontend/src/pages/host/flats/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FlatReservations() {
  const router = useRouter();
  const { id } = router.query;
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchReservations() {
      try {
        const res = await axios.get(`http://localhost:5000/api/flats/${id}/reservations`);
        setReservations(res.data);
      } catch (err) {
        console.error('Error al cargar reservas:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchReservations();
  }, [id]);

  const handleAction = async (rid, action) => {
    try {
      await axios.put(`http://localhost:5000/api/reservations/${rid}/${action}`);
      // Refresca la lista
      setReservations(reservations.map(r =>
        r.id === rid ? { ...r, status: action === 'accept' ? 'aceptado' : 'denegado' } : r
      ));
    } catch (err) {
      console.error(`Error al ${action}:`, err);
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando reservas…</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Reservas para piso #{id}</h1>
      {reservations.length === 0 ? (
        <p className="text-center">No hay reservas todavía.</p>
      ) : (
        reservations.map(r => (
          <div key={r.id} className="border rounded p-4 mb-4 bg-white shadow">
            <p><strong>{r.name}</strong> (@{r.instagram_handle})</p>
            <p>Solicitada: {new Date(r.requested_at).toLocaleString()}</p>
            <p>Estado: {r.status}</p>
            {r.status === 'en_reserva' && (
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleAction(r.id, 'accept')}
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                >
                  Aceptar
                </button>
                <button
                  onClick={() => handleAction(r.id, 'deny')}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                >
                  Denegar
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
