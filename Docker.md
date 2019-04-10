Voici quelques lignes de commande si vous souhaitez executer via Docker ( le pré-requis étant bien sur que vous ayez deja docker installé sur votre poste )

docker run -di --name ksia tensorflow/tensorflow:latest-devel 
docker exec -ti ksia sh
***


puis dans la console sh

apt-get update
apt-get install vim
apt-get install python3-pip
/usr/bin/python3.5 -m pip install tensorflow
mkdir logiciel
cd logiciel
git clone https://github.com/WeWyse/KSIA.git
cd KSIA
cd sh

puis lancer la commande suivante

./recognize.sh ../src/fr.wewyse.iatoolbox/label.py ../src/resources/tf_files/images/recognize/pic_001.JPEG