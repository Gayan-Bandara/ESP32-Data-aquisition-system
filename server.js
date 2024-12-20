const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Add axios for making HTTP requests to the ESP32
const app = express();

app.use(cors());
app.use(express.json());

let ESP32_IP = "192.168.1.100"; // Default IP address

// Endpoint to fetch sensor data from ESP32
app.get('/data', async (req, res) => {
  try {
    const response = await axios.get(`http://${ESP32_IP}/data`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching sensor data:', error.message);
    res.status(500).json({ error: 'Error fetching sensor data' });
  }
});

// Endpoint to get the current ESP32 IP address
app.get('/esp32-ip', (req, res) => {
  res.json({ ip: ESP32_IP });
});

// Endpoint to update the ESP32 IP address
app.post('/esp32-ip', (req, res) => {
  const { ip } = req.body;
  if (!ip) {
    return res.status(400).json({ error: 'Invalid IP address' });
  }
  ESP32_IP = ip;
  res.json({ message: 'IP address updated successfully', ip: ESP32_IP });
});

// Endpoint to control motor, fan, and light
app.post('/control', async (req, res) => {
  const { motor, fan, light } = req.body;

  if (motor === undefined && fan === undefined && light === undefined) {
    return res.status(400).json({ error: 'No control parameters provided' });
  }

  try {
    const params = new URLSearchParams();
    if (motor !== undefined) params.append('motor', motor);
    if (fan !== undefined) params.append('fan', fan);
    if (light !== undefined) params.append('light', light);

    const response = await axios.post(`http://${ESP32_IP}/control?${params.toString()}`);
    res.json({ message: 'Control command sent successfully', data: response.data });
  } catch (error) {
    console.error('Error sending control command:', error.message);
    res.status(500).json({ error: 'Error sending control command' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});