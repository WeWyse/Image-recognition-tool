# Projet

**IRTT**: **I**mage **R**ecognition **T**raining **T**ool

# Principe du projet : 

Mise en place d'un portail web qui permet de réaliser de la reconnaissance d'images.

2 fonctionnalités sont proposées:

- apprentissage  : fournir un "bulk" d'images labellisées et lancer l'apprentissage.
- reconnaissance : fournir une image et lancer la reconnaissance de cette dernière.


En back , on passe par un algo s'appuyant sur le principe du "Transfert Learning" ( Inception Classifier )


La solution s'articule autours de 2 containers Docker:

- un container "nodejs" : frontal web dédié à la gestion des images à labelliser ou à entrainer.
- un container "tensorflow" : applicatif qui permettra de lancer les scripts python de labellisation et de reconnaissance.

Cf wiki : https://github.com/WeWyse/Image-recognition-tool/wiki
