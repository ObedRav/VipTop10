#!/bin/bash
openssl req -nodes -new -x509 -keyout server.key -out server.cert
mkdir SSL_Certificates
mv server* SSL_Certificates
