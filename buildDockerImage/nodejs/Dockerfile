# Image nodejs: 
FROM node 

RUN apt-get update \ 
&& apt-get -y install vim \
&& apt-get -y install curl

RUN npm install express

RUN npm install formidable@latest

RUN npm install path

RUN npm install fs-extra

RUN mkdir -p /usr/src/app

COPY index.js /usr/src/app

EXPOSE 8080

RUN useradd docker


