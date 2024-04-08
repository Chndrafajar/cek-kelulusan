import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import colors from 'colors';
import morgan from 'morgan';

//routes
import adminRoutes from './routes/adminRoutes.js';
import siswaRoutes from './routes/siswaRoutes.js';
import jurusanRoutes from './routes/jurusanRoutes.js';
import kelasRoutes from './routes/kelasRoutes.js';

//dotenv config
dotenv.config();

//rest object
const app = express();

//database config
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes api
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/siswa', siswaRoutes);
app.use('/api/v1/jurusan', jurusanRoutes);
app.use('/api/v1/kelas', kelasRoutes);

app.use('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server berjalan di mode ${process.env.DEV_MODE} pada port ${PORT}`.bgGreen.white);
});
