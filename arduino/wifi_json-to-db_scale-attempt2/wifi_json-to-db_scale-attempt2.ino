#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <HX711_ADC.h>

#define SDOUT  D6
#define SCLK  D4

#define LED     13
#define B1      D1  // SEND DATA
#define B2      D8  // TARE
#define PROX    D2

#define LOC_ID  424242
#define BUI_ID  4242
#define CAT_ID  42
#define VOL     4

const char* ssid = "UHM";
const char* password = "";

const char* mqttServer = "";
const int mqttPort = ;
const char* mqttUser = "";
const char* mqttPassword = "";

WiFiClient espClient;
PubSubClient client(espClient);

int lastButtonState = LOW;
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 10;

int itemCount = 0;
float bagWeight = 0;

HX711_ADC LoadCell(SDOUT, SCLK);
long stabilisingtime = 1000; // tare preciscion can be improved by adding a few seconds of stabilising time
float calFactor = 10000; //-7050 worked for my 440lb max scale setup

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(B1, INPUT);
  pinMode(B2, INPUT);
  pinMode(PROX, INPUT); 
  Serial.begin(115200);

  // Initialize Scale
  LoadCell.begin();
  LoadCell.start(stabilisingtime);
  LoadCell.setCalFactor(calFactor); // user set calibration factor (float)
  // Done

  // Initialize WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(250);
    digitalWrite(LED, HIGH);
    Serial.print(".");
    delay(250);
    digitalWrite(LED, LOW);
  }
  digitalWrite(LED, HIGH);
  Serial.println("\nConnected!");
  // Done

  // Initialize MQTT
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);

  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
 
    if (client.connect("ESP8266Client", mqttUser, mqttPassword )) {
      Serial.println("connected");  
    } else {
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }
  digitalWrite(LED, LOW);
  // Done

  // Initialize Scale

  digitalWrite(LED, HIGH);
  delay(2000);
  digitalWrite(LED, LOW);
}

// the loop function runs over and over again forever
void loop() {
  client.loop();
    
  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(LED_BUILTIN, HIGH);
  } else {
    lblink(LED_BUILTIN, 1);
  }

  if (debounce(B1, lastButtonState, lastDebounceTime, debounceDelay)){
    sblink(LED, 1);
    bagWeight = getBagWeight();
    lblink(LED, 2);
    sendContentData(bagWeight, itemCount);
    lblink(LED, 2);
    bagWeight = 0;
    itemCount = 0;
    lblink(LED, 2);
    sblink(LED, 1);
  }

  if (debounce(B2, lastButtonState, lastDebounceTime, debounceDelay)){
    lblink(LED, 2);
  }

  if (!digitalRead(PROX)){
    sblink(LED, 1);
    delay(250);
    sblink(LED, ++itemCount);
  }
}

void sendContentData(float weight, int count) {
  StaticJsonBuffer<600> jsonBuffer;
  JsonObject& jsonData = jsonBuffer.createObject();
  jsonData["location_id"] = LOC_ID;
  jsonData["building_id"] = BUI_ID;
  jsonData["category_id"] = CAT_ID;
  jsonData["weight"] = weight;
  jsonData["volume"] = VOL;
  jsonData["count"] = count;

  char jsonStringBuffer[300];
  jsonData.printTo(jsonStringBuffer, sizeof(jsonStringBuffer));
  client.publish("jfam/gather",jsonStringBuffer);
}

float getBagWeight() {
  long t = millis();
  float w;
  int i = 0;
  lblink(LED, 2);
  while(i < 10){
    LoadCell.update();

    if (millis() > t + 250) {
      w = LoadCell.getData();
      t = millis();
      i++;
    }
    delay(10);
  }
  return w;
}

bool debounce(int input_pin, bool last_state, unsigned long last_time, unsigned long desired_delay) {
  // Requires persistent variables for last button state and last timestamp (current button state is the return)
  
  unsigned long current_time = millis();
  if ((current_time - last_time) < desired_delay) return last_state;
  
  bool current_state = digitalRead(input_pin);
  bool retVal = last_state && current_state;
  if (!retVal) { retVal = last_state ^ current_state; }
  
  last_state = current_state;
  return retVal;
}

void callback(char* topic, byte* payload, unsigned int length) {
 
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
 
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
 
  Serial.println();
  Serial.println("-----------------------");
 
}

void blink(int led_pin, int amt, unsigned long len){
  for (int i = 0; i < amt; i++){
    digitalWrite(led_pin, LOW);
    delay(len);
    digitalWrite(led_pin, HIGH);
    delay(len);
    digitalWrite(led_pin, LOW); 
  }
}
void sblink(int led_pin, int blinks){blink(led_pin, blinks, 100);}
void lblink(int led_pin, int blinks){blink(led_pin, blinks, 250);}
