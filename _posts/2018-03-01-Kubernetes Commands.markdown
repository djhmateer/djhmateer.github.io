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
```
kubectl expose rc hello-rc --name=hello-svc --target-port=8080 --type=NodePort
-- find port
kubectl describe svc hello-svc
-- find ip address of vm
minikube dashboard 

kubectl delete svc hello-svc

apiVersion: v1
kind: Service
metadata:
  name: hello-svc
  labels:
    app: hello-world
spec:
  type: NodePort
  ports:
  - port: 8080
    nodePort: 30001
    protocol: TCP
  selector:
    app: hello-world

kubectl describe pods | grep app
kubectl create -f svc.yml

http://192.168.1.101:30001
```

## deploy.yml
```

```


## Updating and Rollbacks
K8s must bring value to the business eg
- Keep it running
- Make it agile
- Make it resilient

Making updates for 0 downtime
--change the deploy.yml updating the docker container's tag (latest or edge in his example)

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