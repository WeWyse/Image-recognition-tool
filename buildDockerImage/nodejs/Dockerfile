# Image nodejs: 
FROM node 

RUN apt-get update \ 
&& apt-get -y install vim \
&& apt-get -y install curl

RUN npm install express

RUN mkdir -p /usr/src/app

COPY index.js /usr/src/app

EXPOSE 8080

RUN useradd docker


