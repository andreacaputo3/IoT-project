#!/usr/bin/python
import socket
import sys
import Adafruit_DHT

def server_program():
    host = '0.0.0.0'  # Indirizzo IP del server (0.0.0.0 ascolta su tutte le interfacce)
    port = 5003  # Porta da utilizzare

    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # Creazione del socket TCP
    server_socket.bind((host, port))  # Bind del socket all'indirizzo e porta specificati

    while True:
        try:
            server_socket.listen(2)
            conn, address = server_socket.accept()  # Accettazione della connessione
            print("Connection from: " + str(address))
            humidity, temperature = Adafruit_DHT.read_retry(11, 4)
            message = '{0}-{1}'.format(int(temperature), int(humidity))
            conn.send(message.encode())
            conn.close()
        except KeyboardInterrupt:
            conn.close()
            sys.exit()

if __name__ == '__main__':
    server_program()
