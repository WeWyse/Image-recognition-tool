# Image KSIA
FROM tensorflow/tensorflow:latest-devel

RUN apt-get update \ 
&& apt-get -y install vim \ 
&& apt-get -y install python3-pip \ 
&& apt-get -y install curl \
&& apt-get -y install cron \
&& apt-get -y install grep

RUN /usr/bin/python3.6 -m pip install tensorflow 

RUN mkdir -p /root/logiciel 

WORKDIR /root/logiciel

RUN git clone https://github.com/WeWyse/KSIA.git 

COPY launch.sh /root/logiciel/KSIA/sh

RUN rm -rf /root/logiciel/KSIA/.idea

RUN rm -rf /root/logiciel/KSIA/buildDockerImage

RUN rm -rf /root/logiciel/KSIA/Docker.md

RUN rm -rf /root/logiciel/KSIA/Home.md

RUN rm -rf /root/logiciel/KSIA/README.md

WORKDIR /root/logiciel/KSIA/sh

