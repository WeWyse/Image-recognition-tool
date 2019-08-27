#!/bin/bash
python3 $1 \
--image_dir $2 \
--bottleneck_dir=$3 \
--how_many_training_steps=$4 \
--model_dir=$5 \
--output_graph=$6 \
--output_labels=$7


#exemple : ./learn.sh ../src/fr.wewyse.iatoolbox/retrain.py ../src/resources/tf_files/images/learn ../src/resources/tf_files/bottlenecks 1000 ../src/resources/tf_files/inception ../src/resources/tf_files/retrained_files.pb ../src/resources/tf_files/retrained_labels.txt
