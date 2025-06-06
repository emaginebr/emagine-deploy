#!/bin/bash
docker stop emagine-app1
docker rm emagine-app1
docker build -t emagine-app .
docker run --name emagine-app1 -p 80:80 -p 443:443 --network docker-network emagine-app &