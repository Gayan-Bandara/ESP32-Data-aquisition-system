#include <WiFi.h>
#include <WebServer.h>

// Wi-Fi credentials
const char* ssid = "Dialog 4G";
const char* password = "18NN52B852Y";

// Web server instance
WebServer server(80);

// Pins for sensors
const int sensor1Pin = 32;
const int sensor2Pin = 33;
const int sensor3Pin = 34;

// Pins for motor, fan, and light
const int motorPin = 15;
const int fanPin = 2;
const int lightPin = 4;

// Handle sensor data
void handleData() {
  // Read sensor values
  int sensor1Value = map(analogRead(sensor1Pin), 0, 4095, 0, 100);
  int sensor2Value = map(analogRead(sensor2Pin), 0, 4095, 0, 100);
  int sensor3Value = map(analogRead(sensor3Pin), 0, 4095, 0, 100);

  // Prepare JSON response
  String jsonResponse = String("{\"sensor1\": ") + sensor1Value +
                        ", \"sensor2\": " + sensor2Value +
                        ", \"sensor3\": " + sensor3Value + "}";

  // Send response
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", jsonResponse);
}

// Handle device control
void handleControl() {
  if (server.hasArg("motor")) {
    int motorState = server.arg("motor").toInt();
    digitalWrite(motorPin, motorState);
  }
  if (server.hasArg("fan")) {
    int fanState = server.arg("fan").toInt();
    digitalWrite(fanPin, fanState);
  }
  if (server.hasArg("light")) {
    int lightState = server.arg("light").toInt();
    digitalWrite(lightPin, lightState);
  }
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", "{\"status\": \"OK\"}");
}

void setup() {
  Serial.begin(115200);

  // Initialize sensor pins
  pinMode(sensor1Pin, INPUT);
  pinMode(sensor2Pin, INPUT);
  pinMode(sensor3Pin, INPUT);

  // Initialize control pins
  pinMode(motorPin, OUTPUT);
  pinMode(fanPin, OUTPUT);
  pinMode(lightPin, OUTPUT);

  // Set default states
  digitalWrite(motorPin, LOW);
  digitalWrite(fanPin, LOW);
  digitalWrite(lightPin, LOW);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to Wi-Fi...");
  }
  Serial.println("Connected to Wi-Fi");
  Serial.println(WiFi.localIP());

  // Define endpoints
  server.on("/data", handleData);
  server.on("/control", handleControl);

  // Start the server
  server.begin();
}

void loop() {
  server.handleClient();

  // Read sensor values
  int sensor1Value = map(analogRead(sensor1Pin), 0, 4095, 0, 100);
  int sensor2Value = map(analogRead(sensor2Pin), 0, 4095, 0, 100);
  int sensor3Value = map(analogRead(sensor3Pin), 0, 4095, 0, 100);

  // Print sensor values to the Serial Monitor
  /*Serial.print("Sensor 1: ");
  Serial.print(sensor1Value);
  Serial.print(" | Sensor 2: ");
  Serial.print(sensor2Value);
  Serial.print(" | Sensor 3: ");
  Serial.println(sensor3Value);*/

}
