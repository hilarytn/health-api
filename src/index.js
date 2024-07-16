import express from 'express';
import dotenv from 'dotenv';
import connectDB from './api/config/db.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './api/routes/authRoutes.js';
import appointmentRoutes from './api/routes/appointmentRoutes.js';
import departmentRoutes from './api/routes/departmentRoutes.js';
import doctorRoutes from './api/routes/doctorRoutes.js';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const port = 3000;

app.set('views', join(__dirname, '', 'Telehealth'))
app.set('view engine', 'ejs')
app.use(express.static(join(__dirname, '', 'Telehealth')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/doctor', doctorRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/appointment', (req, res) => {
  res.render('appointment');
});

app.get('/blog-sidebar', (req, res) => {
  res.render('blog-sidebar');
});

app.get('/childcare', (req, res) => {
  res.render('childcare');
});

app.get('/confirmation', (req, res) => {
  res.render('confirmation');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/department', (req, res) => {
  res.render('department');
});

app.get('/doctor-single', (req, res) => {
  res.render('doctor-single');
});

app.get('/doctor', (req, res) => {
  res.render('doctor');
});

app.get('/documentation', (req, res) => {
  res.render('documentation');
});

app.get('/server-health', (req, res) => {
  res.send('Server is Up, and running');
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
