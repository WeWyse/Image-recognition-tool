#!/bin/bash
kubectl delete ingress nodejs-ingress
kubectl delete service nodejs-service
kubectl delete deployment nodejs-dep
kubectl delete pvc nodejs-claim
kubectl delete pv nodejs-volume
