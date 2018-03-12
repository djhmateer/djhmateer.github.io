---
layout: post
title:  "Kubernetes Commands"
date:   2018-03-12 13:23
menu: review
categories: kubernetes
published: true 
---
List of useful commands:

```
--v0.25.0
minikube version
minikube start
minikube start --vm-driver hyperv --hyperv-virtual-switch "dave"
minikube stop
minikube dashboard

-- v1.9.0
kubectl version --client
kubectl get nodes

kubectl get pods
kubectl describe pods

kubectl create -f pod.yml
```
The concepts I use are:

```
nodes
pods
rc (replication controller)
svc
  ep (endpoint)
deploy
  rs (replica set)
```
## pod.yml
We never do this in production (would use a repliction controller at minimum)

```
-- pod.yml
apiVersion: v1
kind: Pod
metadata:
  name: hello-pod
  labels:
    zone: prod
    version: v1
spec:
  containers:
  - name: hello-ctr
    image: nigelpoulton/pluralsight-docker-ci:latest
    ports:
    - containerPort: 8080


kubectl create -f pod.yml
kubectl delete pod hello-pod
```

## rc.yml
Adding a replication controller to get to a desired state. The bottom part is very similar to above.

```
apiVersion: v1
kind: ReplicationController
metadata:
  name: hello-rc
spec:
  replicas: 20
  selector:
    app: hello-world
  template:
    metadata:
      labels:
        app: hello-world
    spec:
      containers:
      - name: hello-ctr
        image: nigelpoulton/pluralsight-docker-ci:latest
        ports:
        - containerPort: 8080

kubectl get rc
kubectl describe rc
kubectl apply -f rc.yml 
```

## svc.yml



## Reset Minikube
```
minikube stop
--delete the vm in hyperv
--delete everything in c:\minikube_home\
minikube start --vm-driver hyperv --hyperv-virtual-switch "dave"
minikube stop
--stop the vm
--disable dynamic memory (fixes memory leak)
minikube start
```