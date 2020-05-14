/*
*/

#include <ArduinoBLE.h>

BLEService controllerService("19B10000-E8F2-537E-4F6C-D104768A1214"); // create service

// create control characteristic and allow remote device to read and write
BLEByteCharacteristic controlCharacteristic("19B10001-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite);



void setup() {
  Serial.begin(9600);
  while (!Serial);

  // set all the motor control pins to outputs
  pinMode(enA, OUTPUT);
  pinMode(enB, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);

  // begin initialization
  if (!BLE.begin()) {
    Serial.println("starting BLE failed!");

    while (1);
  }

  // set the local name peripheral advertises
  BLE.setLocalName("Bluno");
  // set the UUID for the service this peripheral advertises
  BLE.setAdvertisedService(controllerService);

  // add the characteristic to the service
  controllerService.addCharacteristic(controlCharacteristic);

  // add service
  BLE.addService(controllerService);

  // assign event handlers for connected, disconnected to peripheral
  BLE.setEventHandler(BLEConnected, blePeripheralConnectHandler);
  BLE.setEventHandler(BLEDisconnected, blePeripheralDisconnectHandler);

  // assign event handlers for characteristic
  controlCharacteristic.setEventHandler(BLEWritten, controlCharacteristicWritten);
  // set an initial value for the characteristic
  controlCharacteristic.setValue(0);

  // start advertising
  BLE.advertise();

  Serial.println(("Bluetooth device active, waiting for connections..."));
}

void loop() {
  // poll for BLE events
  BLE.poll();
  if(value() == 49){
    analogWrite(enA,200);
    analogWrite(enB,200);
    digitalWrite(in2,HIGH);
    digitalWrite(in1,LOW);
    digitalWrite(in3,LOW);
    digitalWrite(in4,HIGH);
  }
  if(value() == 50){
    analogWrite(enA,200);
    analogWrite(enB,200);
    digitalWrite(in2,LOW);
    digitalWrite(in1,HIGH);
    digitalWrite(in3,HIGH);
    digitalWrite(in4,LOW);
  }
  if(value() == 48){
    analogWrite(enA,LOW);
    analogWrite(enB,LOW);
  }
  if(value() == 51)
    analogWrite(enA,LOW);
    analogWrite(enB,HIGH);
    digitalWrite(in3,LOW);
    digitalWrite(in4,HIGH);
  }
  if(value() == 52){
    analogWrite(enA,HIGH);
    analogWrite(enB,LOW);
    digitalWrite(in2,HIGH);
    digitalWrite(in1,LOW);
  }

void blePeripheralConnectHandler(BLEDevice central) {
  // central connected event handler
  Serial.print("Connected event, central: ");
  Serial.println(central.address());
}

void blePeripheralDisconnectHandler(BLEDevice central) {
  // central disconnected event handler
  Serial.print("Disconnected event, central: ");
  Serial.println(central.address());
}

void controlCharacteristicWritten(BLEDevice central, BLECharacteristic characteristic) {
  Serial.print("Characteristic event, written:");
  // while the central is still connected to peripheral:
    byte value = 0;
    characteristic.readValue(value);
    Serial.print("Value is: ");
    Serial.print(value);
    Serial.print("\n");
    
}