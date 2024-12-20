import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./App.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const App = () => {
  const [ESP32IP, setESP32IP] = useState("");
  const [newIP, setNewIP] = useState("");
  const [sensorData, setSensorData] = useState({ sensor1: 0, sensor2: 0, sensor3: 0 });
  const [timeStamps, setTimeStamps] = useState([]);
  const [sensor1Values, setSensor1Values] = useState([]);
  const [sensor2Values, setSensor2Values] = useState([]);
  const [sensor3Values, setSensor3Values] = useState([]);
  const [controlStates, setControlStates] = useState({ motor: 0, fan: 0, light: 0 });

  // Fetch the current ESP32 IP address
  const fetchESP32IP = async () => {
    try {
      const response = await fetch("http://localhost:5000/esp32-ip");
      const data = await response.json();
      setESP32IP(data.ip);
    } catch (error) {
      console.error("Error fetching ESP32 IP address:", error);
    }
  };

  // Update the ESP32 IP address
  const updateESP32IP = async () => {
    try {
      const response = await fetch("http://localhost:5000/esp32-ip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip: newIP }),
      });
      const data = await response.json();
      setESP32IP(data.ip);
      alert(data.message);
    } catch (error) {
      console.error("Error updating ESP32 IP address:", error);
    }
  };

  // Fetch sensor data from the backend
  const fetchSensorData = async () => {
    try {
      const response = await fetch("http://localhost:5000/data");
      const data = await response.json();
      const currentTime = new Date().toLocaleTimeString();

      setSensorData(data);
      setTimeStamps((prev) => [...prev.slice(-20), currentTime]);
      setSensor1Values((prev) => [...prev.slice(-20), data.sensor1]);
      setSensor2Values((prev) => [...prev.slice(-20), data.sensor2]);
      setSensor3Values((prev) => [...prev.slice(-20), data.sensor3]);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  // Send control commands to the backend
  const sendControlCommand = async (device, state) => {
    try {
      const response = await fetch("http://localhost:5000/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [device]: state }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(`Error controlling ${device}:, error`);
    }
  };

  // Toggle device state
  const toggleDevice = (device) => {
    const newState = controlStates[device] === 1 ? 0 : 1;
    setControlStates((prev) => ({ ...prev, [device]: newState }));
    sendControlCommand(device, newState);
  };

  useEffect(() => {
    fetchESP32IP();
    const interval = setInterval(fetchSensorData, 50);
    return () => clearInterval(interval);
  }, [ESP32IP]);

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Time" },
      },
      y: {
        title: { display: true, text: "Sensor Values" },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  const sensor1Data = {
    labels: timeStamps,
    datasets: [
      {
        label: "Sensor 1",
        data: sensor1Values,
        borderColor: "teal",
        backgroundColor: "rgba(0, 128, 128, 0.2)",
      },
    ],
  };

  const sensor2Data = {
    labels: timeStamps,
    datasets: [
      {
        label: "Sensor 2",
        data: sensor2Values,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
      },
    ],
  };

  const sensor3Data = {
    labels: timeStamps,
    datasets: [
      {
        label: "Sensor 3",
        data: sensor3Values,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
      },
    ],
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Green House Dashboard</h1>

        <div>
          <h3>Current ESP32 IP: {ESP32IP}</h3>
          <input
            type="text"
            placeholder="Enter new IP"
            value={newIP}
            onChange={(e) => setNewIP(e.target.value)}
          />
          <button onClick={updateESP32IP}>Update IP</button>
        </div>

        <div className="control-panel">
          <h3>Device Controls</h3>
          <button onClick={() => toggleDevice("motor")}>
            Motor: {controlStates.motor === 1 ? "ON" : "OFF"}
          </button>
          <button onClick={() => toggleDevice("fan")}>
            Fan: {controlStates.fan === 1 ? "ON" : "OFF"}
          </button>
          <button onClick={() => toggleDevice("light")}>
            Light: {controlStates.light === 1 ? "ON" : "OFF"}
          </button>
        </div>

        <div className="graphs-container">
          <div className="graph-container">
            <h3>Temperature</h3>
            <Line options={commonOptions} data={sensor1Data} />
          </div>
          <div className="graph-container">
            <h3>Humidity</h3>
            <Line options={commonOptions} data={sensor2Data} />
          </div>
          <div className="graph-container">
            <h3>Light Intensity</h3>
            <Line options={commonOptions} data={sensor3Data} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;