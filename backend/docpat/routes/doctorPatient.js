const express = require('express');
const DoctorPatient = require('../models/doctorPatient');

const router = express.Router();

router.post('/link', async (req, res) => {
  const { doctorId, patientId } = req.body;

  try {
    const doctorPatient = new DoctorPatient({ doctorId, patientId });
    await doctorPatient.save();
    res.status(201).send({ message: 'Doctor-Patient link created successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Link creation failed' });
  }
});

module.exports = router;
