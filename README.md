# ESP32 Sensor Dashboard with Real-Time Visualization

Welcome to the **ESP32 Sensor Dashboard**, a real-time IoT monitoring system built to collect, process, and display sensor data dynamically. This project integrates React for the front-end and an ESP32 microcontroller for back-end data acquisition and hosting.

## Features
- **Real-Time Data Visualization**:
  - Sensor values are dynamically updated every second.
  - Three separate graphs displaying data from three sensors in real-time.
  - Horizontally aligned graphs for a clean and user-friendly UI.

- **Sensor Mapping**:
  - Sensor values are mapped to their actual ranges (e.g., temperature, humidity, etc.).

- **1-Minute Data View**:
  - Only the last minute's data is displayed to keep the dashboard concise and relevant.

- **Responsive Design**:
  - Optimized for desktop and mobile viewing.

## Tech Stack
### Front-End:
- **React**: For creating a dynamic and interactive user interface.
- **Chart.js**: For rendering responsive and customizable real-time graphs.

### Back-End:
- **ESP32 Microcontroller**: Handles data acquisition from sensors and hosts a RESTful API to serve sensor data.
- **C++**: Used to program the ESP32.

### Communication:
- **Wi-Fi**: ESP32 connects to the local Wi-Fi network and serves data via an API.

## How It Works
1. **ESP32 Setup**:
   - Reads data from three sensors connected to its analog pins.
   - Maps the raw sensor values to their actual ranges.
   - Serves the sensor data via a RESTful API in JSON format.

2. **React Front-End**:
   - Fetches the sensor data from the ESP32 API.
   - Dynamically updates the graphs to reflect real-time sensor values.
   - Displays a user-friendly dashboard.

## Installation

### Hardware Requirements
- ESP32 Microcontroller
- Sensors (e.g., temperature, humidity, light intensity, etc.)
- Wi-Fi Network

### Software Requirements
- Node.js (for React)
- Arduino IDE (for ESP32)
- Git

### Steps to Run the Project
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/esp32-sensor-dashboard.git
   cd esp32-sensor-dashboard
   ```

2. **Set Up the ESP32**:
   - Open the `esp32_code.ino` file in the Arduino IDE.
   - Update the Wi-Fi credentials in the code:
     ```cpp
     const char* ssid = "Your Wi-Fi SSID";
     const char* password = "Your Wi-Fi Password";
     ```
   - Flash the code to your ESP32 microcontroller.

3. **Run the React Front-End**:
   - Navigate to the `react-frontend` folder:
     ```bash
     cd react-frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React application:
     ```bash
     npm start
     ```
   - Open your browser and go to `http://localhost:3000`.

4. **Access the Dashboard**:
   - Ensure your ESP32 is connected to the same Wi-Fi network.
   - The React app fetches sensor data from the ESP32 API and displays it on the dashboard.

## Project Structure
```
.
├── esp32_code.ino        # ESP32 C++ code
├── react-frontend/       # React front-end project
│   ├── src/
│   │   ├── App.js        # Main React app logic
│   │   ├── Graph.js      # Graph rendering logic
│   │   ├── api.js        # API fetch logic
│   │   └── styles.css    # Styling
│   ├── package.json      # React project dependencies
│   └── ...
└── README.md             # This file
```

## API Details
The ESP32 serves data at the endpoint `/data`:
- **Endpoint**: `http://<ESP32-IP>/data`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "sensor1": 1023,
    "sensor2": 2048,
    "sensor3": 4096
  }
  ```

## Future Enhancements
- Add more sensors and dynamic graph generation.
- Display sensor alerts when values exceed safe thresholds.
- Deploy the project online for remote monitoring.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy Coding! 😊
```

Feel free to replace the placeholders (like `your-username` and screenshot paths) with your specific details!
