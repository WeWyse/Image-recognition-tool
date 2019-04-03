Welcome to the KSIA wiki!

Vous trouverez ici un petit projet qui vous permettra de réaliser de la reconnaissance
d'image via le principe du "Transfert Learning"

Lien vers une petit vidéo Youtube qui explique bien le principe:

https://www.youtube.com/watch?v=QfNvhPx5Px8

Une fois que vous avez clone le projet , rendez-vous dans le répertoire

**/src**

**2 fichiers sont présents**

**learn.sh**      --> lance un script python d'apprentissage basé sur le principe du "Transfer Lerning"
**recongnize.sh** --> lance un script python de reconnaissance.

Le projet embarque 2 répertoires d'images qui permettent de tester le principe : ballon-foot , ballon-rugby

Vous pouvez l'apprentissage comme suit : 

./learn.sh ../src/fr.wewyse.iatoolbox/retrain.py ../src/resources/tf_files/images/learn ../src/resources/tf_files/bottlenecks 1000 ../src/resources/tf_files/inception ../src/resources/tf_files/retrained_files.pb ../src/resources/tf_files/retrained_labels.txt
***


une fois l'apprentissage terminé , vous pouvez lancer un test de reconnaissance comme suit : 
./recognize.sh ../src/fr.wewyse.iatoolbox/label.py ../src/resources/tf_files/images/recognize/pic_001.JPEG

pic_001.JPEG étant l'image d'un ballon de foot, vous devriez voir ceci comme résultat

ballon foot (score = 0.99992)
ballon rugby (score = 0.00008)

