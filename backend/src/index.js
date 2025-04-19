require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knexConfig = require('../knexfile').development;
const knex = require('knex')(knexConfig);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Rutas
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter(knex));

const flatsRouter = require('./routes/flats');
app.use('/api/flats', flatsRouter(knex));

const reservationsRouter = require('./routes/reservations');
app.use('/api', reservationsRouter(knex));

// Solo arrancar servidor si este archivo es ejecutado directamente
 if (require.main === module) {
     app.listen(PORT, () => {
       console.log(`Server listening on http://localhost:${PORT}`);
     });
   }
  
   // Exportamos el app para testing
   module.exports = app;

