#!/bin/bash

################################################################################
# auteur : Stéphane LENGLET : WWYSE                                           #
# date   : 10/06/2019                                                          #
# objet  : Script gestion KSIA			                               #
################################################################################


REP_SCAN=/Users/docker
FILE_LEARN=/learn.lock
FILE_RECO=/recognize.lock
FILE_LEARN_INP=/learn.inprogress
FILE_RECO_INP=/recognize.inprogress
FILE_LEARN_DONE=/learn.done
FILE_RECO_DONE=/recognize.done

if [ -f "$REP_SCAN$FILE_RECO" ];then
        TASK=`cat /Users/docker/recognize.lock`
	echo $TASK
	echo -e "\033[32mOK --> Demande de reconnaissance d image \033[0m";
	sleep 2
	mv $REP_SCAN$FILE_RECO $REP_SCAN$FILE_RECO_INP
	
        ####### Lancement reco #############
        
        echo -e "####### On lance le script reco $TASK"
        nohup ./recognize.sh ../src/fr.wewyse.iatoolbox/label.py $TASK >> /Users/docker/log_reco.txt
	sleep 10

	mv $REP_SCAN$FILE_RECO_INP $REP_SCAN$FILE_RECO_DONE

	exit 0

elif [ -f "$REP_SCAN$FILE_LEARN" ];then
	TASK=`cat /Users/docker/learn.lock`
        echo -e "\033[32mOK --> Demande d apprentissage d image \033[0m";
        sleep 2
        mv $REP_SCAN$FILE_LEARN $REP_SCAN$FILE_LEARN_INP

        ####### Lancement learn #############
 
        echo -e "####### On lance le script learn"
        `nohup ./learn.sh ../src/fr.wewyse.iatoolbox/retrain.py /Users/docker/www/ksia/images/learn ../src/resources/tf_files/bottlenecks 1000 ../src/resources/tf_files/inception ../src/resources/tf_files/retrained_files.pb ../src/resources/tf_files/retrained_labels.txt >> /Users/docker/log_learn.txt`
	sleep 10

        mv $REP_SCAN$FILE_LEARN_INP $REP_SCAN$FILE_LEARN_DONE

        exit 0


else
        echo -e "\033[31mKO --> Pas de demande \033[0m";
        exit -1
fi
