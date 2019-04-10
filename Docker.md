Voici quelques lignes de commande si vous souhaitez executer via Docker ( le pré-requis étant bien sur que vous ayez deja docker installé sur votre poste )

> <br>docker run -di --name ksia tensorflow/tensorflow:latest-devel 
> <br>docker exec -ti ksia sh

<br>puis dans la console sh

> <br>apt-get update
> <br>apt-get install vim
> <br>apt-get install python3-pip
> <br>/usr/bin/python3.5 -m pip install tensorflow
> <br>mkdir logiciel
> <br>cd logiciel
> <br>git clone https://github.com/WeWyse/KSIA.git
> <br>cd KSIA
> <br>cd sh

<br>puis lancer la commandes suivante
> ./learn.sh ../src/fr.wewyse.iatoolbox/retrain.py ../src/resources/tf_files/images/learn ../src/resources/tf_files/bottlenecks 1000 ../src/resources/tf_files/inception ../src/resources/tf_files/retrained_files.pb ../src/resources/tf_files/retrained_labels.txt

<br> suivi de 

<br> 
> ./recognize.sh ../src/fr.wewyse.iatoolbox/label.py ../src/resources/tf_files/images/recognize/pic_001.JPEG