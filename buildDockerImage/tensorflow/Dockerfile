# Image KSIA
FROM tensorflow/tensorflow:latest-devel

RUN apt-get update \ 
&& apt-get -y install vim \ 
&& apt-get -y install curl \
&& apt-get -y install cron \
&& apt-get -y install grep \
&& apt-get -y install openssh-server \
&& apt-get -y install python3-pip 

RUN mkdir /var/run/sshd

RUN echo 'root:password' | chpasswd

RUN /usr/bin/python3.6 -m pip install tensorflow 

RUN mkdir -p /root/logiciel

RUN /etc/init.d/ssh start

WORKDIR /root/logiciel

RUN git clone https://github.com/WeWyse/KSIA.git 

COPY launch.sh /root/logiciel/KSIA/sh

COPY learn.sh /root/logiciel/KSIA/sh

COPY recognize.sh /root/logiciel/KSIA/sh

COPY retrained_files.pb /root/logiciel/KSIA/src/resources/tf_files

COPY retrained_labels.txt /root/logiciel/KSIA/src/resources/tf_files

ADD bottlenecks /root/logiciel/KSIA/src/resources/tf_files/bottlenecks

RUN rm -rf /root/logiciel/KSIA/.idea

RUN rm -rf /root/logiciel/KSIA/buildDockerImage

RUN rm -rf /root/logiciel/KSIA/Docker.md

RUN rm -rf /root/logiciel/KSIA/Home.md

RUN rm -rf /root/logiciel/KSIA/README.md

WORKDIR /root/logiciel/KSIA/sh

EXPOSE 22
