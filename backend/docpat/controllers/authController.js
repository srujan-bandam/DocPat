const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');
const config = require('../config/config');

module.exports.signup = async (req, res) => {
  const { name, email, password, specialty } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const doctor = new Doctor({ name, email, passwordHash, specialty });
    await doctor.save();
    res.status(201).send({ message: 'Doctor registered successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Email already in use' });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(400).send({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, doctor.passwordHash);
    if (!isMatch) return res.status(400).send({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: doctor._id }, config.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};
