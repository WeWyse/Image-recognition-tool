# Projet

**IRTT**: **I**mage **R**ecognition **T**raining **T**ool

# Principe du projet : 

* un container "nodejs" : frontal web dédié à la gestion des images à labelliser ou à entrainer.
* un container "tensorflow" : applicatif qui permettra de lancer les scripts python de labellisation et de reconnaissance.
* à venir : container "nginx" pour gérer du loadbalacing au dessus de nodejs

# Pré-requis :

docker (et docker-machine) installés sur votre environnement
* https://docs.docker.com/
* https://docs.docker.com/docker-for-mac/
* https://docs.docker.com/docker-for-windows/
* https://chrome.google.com/webstore/detail/fatkun-batch-download-ima/nnjjahlikiabnchcpehcpkdeckfgnohf?hl=en
( je vous conseille chrome avec cette extension pour récupérer des images facilement et avec une bonne nomenclature )

Dans suite du tuto, je pars du principe que le git clone s'est fait dans le path /Users/docker
(à vous d'adapter si vous optez pour un autre path).

Notez aussi que c'est une béta et que le process n'est pas encore optimal.

# Les étapes : 

### Clone du projet dans /Users/docker
> git clone https://github.com/WeWyse/KSIA.git

### Build image nodejs
> docker build /Users/docker/KSIA/buildDockerImage/nodejs --tag nodejs-v0

### Build image tensorflow
> docker build /Users/docker/KSIA/buildDockerImage/tensorflow --tag tensor-v0

### List environnement docker
> docker-machine ls
--> vous donnera entre autre l'ip à utiliser pour accéder au service

### Création environnement irtt-docker
> docker-machine create irtt-docker

### Start environnement docker
> docker-machine start irtt-docker

### Set env
> eval $(docker-machine env irtt-docker)

### List docker images
> docker image ls

### List docker containers
> docker ps -a

### Regenerate certificates ( optional )
> docker-machine regenerate-certs irtt-docker

### Start container nodejs
> docker run -di --name nodejs-service -v /Users/docker:/Users/docker -d -p 8081:8080 -p 8022:22 id-image-container-nodejs

ex : docker run -di --name nodejs-service -v /Users/docker:/Users/docker -d -p 8081:8080 -p 8022:22 e068202eb067

### Start container tensorflow
> docker run -di --name tensor-service -v /Users/docker:/Users/docker -d -p 2222:22 id-image-container-tensorflow

ex : docker run -di --name tensor-service -v /Users/docker:/Users/docker -d -p 2222:22 5091ada4e39a 

## sh container nodejs
> docker exec -ti nodejs-service sh

à ce stade, vous êtes dans le container du service nodejs, dans le répertoire /usr/src/app

il faut la première fois :

mettre à jour le fichier /usr/src/app/properties.files

> [main]
> some.thing = foo
> ip = < mettre ici l'ip local du container nodejs ( celle accessible via browser web ) >
> port = 8081
> shared.volume = /Users/docker/

> [tensor]
> ip = < mettre ici l'ip priv?e du container , souvent en 172.17.0.xx )

mettre en place le ssh-less entre le container nodejs et le container tensorflow

> faire un ssh-keygen
> et copier le contenu de /root/.ssh/id_rsa.pub
> dans /root/.ssh/authorized_keys du container tensorflow ( vous y accédez comme suit :docker exec -ti tensor-service sh )

### Vous pouvez lancer le service nodejs comme suit : 
> nohup node index &

Vous devez accédez à une interface web : http://ip-local:8081 

### sh container tensorflow
> docker exec -ti tensor-service sh
