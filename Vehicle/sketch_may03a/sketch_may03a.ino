/*

*/

#include <ArduinoBLE.h>

BLEService controllerService("19B10000-E8F2-537E-4F6C-D104768A1214"); // create service

// create control characteristic and allow remote device to read and write
BLEByteCharacteristic controlCharacteristic("19B10001-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite);



void setup() {
  Serial.begin(9600);
  while (!Serial);

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
  // central wrote new value to characteristic, update LED
  Serial.print("Characteristic event, written:");
  // while the central is still connected to peripheral:
    byte value = 0;
    characteristic.readValue(value);
    Serial.print("Value is: ");
    Serial.print(value);
    Serial.print("\n");
    
}
