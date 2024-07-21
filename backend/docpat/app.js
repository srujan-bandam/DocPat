const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const pdfRoutes = require('./routes/pdf');
const doctorPatientRoutes = require('./routes/doctorPatient');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', ()=>authRoutes);
app.use('/pdf', ()=>pdfRoutes);
app.use('/doctor-patient',()=> doctorPatientRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Doctor\'s Portal API');
});

module.exports = app;
