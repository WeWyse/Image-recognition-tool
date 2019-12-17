#!/bin/bash
kubectl delete service tensor-service
kubectl delete deployment tensor-dep
kubectl delete pvc tensor-claim
