# Image KSIA
FROM tensorflow/tensorflow:latest-devel

RUN apt-get update \ 
&& apt-get -y install vim \ 
&& apt-get -y install python3-pip \ 
&& apt-get -y install curl \
&& apt-get -y install cron \
&& apt-get -y install grep

RUN /usr/bin/python3.5 -m pip install tensorflow 

RUN mkdir -p /root/logiciel 

WORKDIR /root/logiciel

RUN git clone https://github.com/WeWyse/KSIA.git 

WORKDIR /root/logiciel/KSIA/sh
