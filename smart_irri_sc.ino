#include <DHT.h>
#include <Wire.h>     //adds I22C library
#include <BH1750.h>   //adds BH1750 library file
#include <ESP8266WiFi.h>
String apiKey = "N6YWJ62J15999BC3";     //Write API key here
const char* server = "api.thingspeak.com";
const char *ssid =  "HUAWEI-ED74";     // Enter your WiFi Name
const char *pass =  "airbusa380"; // Enter your WiFi Password
#define DHTPIN D3          // GPIO Pin where the dht11 is connected
DHT dht(DHTPIN, DHT11);
WiFiClient client;

//BH1750 lightMeter;

const int lightMeterpin = D1;      //light intensity sensor pin
const int moisturePin = A0;             // moisture sensor pin
const int motorPin = D0;
unsigned long interval = 2000;
unsigned long previousMillis = 0;
unsigned long interval1 = 1000;
unsigned long previousMillis1 = 0;
float moisturePercentage;              //moisture reading
float h;                  // humidity reading
float t;                  //temperature reading
float i;                  //light intensity reading

void setup()
{
  Serial.begin(115200);
  delay(10);
  pinMode(motorPin, OUTPUT);
  digitalWrite(motorPin, LOW); // keep motor off initally
  dht.begin();
  Serial.println("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");              // print ... till not connected
  }
  Serial.println("");
  Serial.println("WiFi connected");
}

void loop()
{
  unsigned long currentMillis = millis(); // grab current time

  h = 25;
  //dht.readHumidity();     // read humiduty
  t = 32; 
  //dht.readTemperature();     // read temperature
 i = 9000;
 //lightMeter.readLightLevel(); //read light intensity

 // if (isnan(h) || isnan(t))
  //{
    //Serial.println("Failed to read from DHT sensor!");
    //return;
  //}

  moisturePercentage = ( 100.00 - ( (analogRead(moisturePin) / 1023.00) * 100.00 ) );

  if ((unsigned long)(currentMillis - previousMillis1) >= interval1) {
    Serial.print("Soil Moisture is  = ");
    Serial.print(moisturePercentage);
    Serial.println("%");
    Serial.print("Temperature is = ");
    Serial.print(t);
    Serial.println("C");
    Serial.print("Humidity = ");
    Serial.print(h);
    Serial.println("%");
    Serial.print("Light Intensity = ");
    Serial.print(i);
    Serial.println("LUX");
    
    previousMillis1 = millis();
  }

if (moisturePercentage < 50) {
  digitalWrite(motorPin, HIGH);         // tun on motor
}

if (moisturePercentage > 55) {
  digitalWrite(motorPin, LOW);          // turn off motor
}

if ((unsigned long)(currentMillis - previousMillis) >= interval) {

  sendThingspeak();           //send data to thing speak
  previousMillis = millis();
  client.stop();
}

}

void sendThingspeak() {
  if (client.connect(server, 80))
  {
    String postStr = apiKey;              // add api key in the postStr string
    postStr += "&field1=";
    postStr += String(moisturePercentage);    // add mositure readin
    postStr += "&field2=";
    postStr += String(t);                 // add tempr readin
    postStr += "&field3=";
    postStr += String(h);                  // add humidity readin
    postStr += "&field4=";
    postStr += String(i);               //add light intensity reading
    //postStr += "\r\n\r\n";

    client.print("POST /update HTTP/1.1\n");
    client.print("Host: api.thingspeak.com\n");
    client.print("Connection: close\n");
    client.print("X-THINGSPEAKAPIKEY: " + apiKey + "\n");
    client.print("Content-Type: application/x-www-form-urlencoded\n");
    client.print("Content-Length: ");
    client.print(postStr.length());           //send lenght of the string
    client.print("\n\n");
    client.print(postStr);                      // send complete string
    Serial.print("Moisture Percentage: ");
    Serial.print(moisturePercentage);
    Serial.print("%. Temperature: ");
    Serial.print(t);
    Serial.print(" C, Humidity: ");
    Serial.print(h);
    Serial.print("%. Light: ");
    Serial.print(i);
    Serial.println("LUX. Sent to Thingspeak.");
  }
}
