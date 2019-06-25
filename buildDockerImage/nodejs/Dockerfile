# Image nodejs: 
FROM node 

RUN apt-get update \ 
&& apt-get -y install vim \
&& apt-get -y install curl \
&& apt-get -y install cron \
&& apt-get -y install grep

RUN npm install express

RUN npm install formidable@latest

RUN npm install path

RUN npm install fs-extra

RUN npm install ejs

RUN npm install shelljs

RUN mkdir -p /usr/src/app

RUN mkdir -p /usr/src/app/views

RUN mkdir -p /usr/src/app/img/tempo

COPY index.js /usr/src/app

COPY index.ejs /usr/src/app/views

COPY recognize.ejs /usr/src/app/views

COPY learn.ejs /usr/src/app/views

WORKDIR /usr/src/app/img/tempo

RUN ln -s /Users/docker/www/ksia/images/learn learn

RUN ln -s /Users/docker/www/ksia/images/recognize recognize

WORKDIR /usr/src/app

EXPOSE 8080

RUN useradd docker
