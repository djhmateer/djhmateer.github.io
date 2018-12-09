---
layout: post
title:  "Minikube and Kubernetes Commands"
date:   2018-03-12 13:23
menu: review
categories: kubernetes
published: true 
sitemap: false
---

This is part 4 of a [series](/docker/2018/02/14/What-is-docker-good-for.html)

[Pluralsight course by Nidel Poulton](https://app.pluralsight.com/library/courses/getting-started-kubernetes/table-of-contents) on "Getting Started with Kubernetes" has a good section on Minikube. The overall summary for Windows is get the minikube binary and kubectl binary in the path. I use c:\sharedTools.

I found there to be a memory leak so need to turn off dynamic memory in HyperV settings.

[Minikube Home](https://github.com/kubernetes/minikube/issues/1967) issue if it doesn't start. Can also delete the $HOME\.minikube folder

```
--v0.25.0
minikube version
minikube start
minikube start --vm-driver hyperv --hyperv-virtual-switch "dave"
minikube stop
minikube dashboard

-- v1.9.0
kubectl version --client
-- displays 
kubectl config current-context  

-- creates a kubeconfig entry for GKE cluster-1.
gcloud container clusters get-credentials cluster-1 --zone europe-west1-d --project ps-kube-196811

-- switch between contexts
kubectl config get-contexts
kubectl config use-context minikube 

kubectl get nodes
kubectl get pods
kubectl cluster-info
```
## Terms and Concepts
Ephemeral = lasting for a very short time  
Ingress = inbound   
Egress = outbound   


```
nodes
pods
rc (replication controller)
svc
  ep (endpoint)
deploy
  rs (replica set)
ingress
secret
persistentvolume pv
persistentvolumeclaim pvc
```
## svc.yml
Adding a service to add a NodePort which exposes 8080. If this is in a cloud cluster, then you can open port 30001 to each VM, but the correct way to do it is to use a load balancer. See below using ingress.

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
Deployments are all about updates and rollbacks
```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: hello-deploy
spec:
  replicas: 10
  minReadySeconds: 10
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  template:
    metadata:
      labels:
        app: hello-world
    spec:
      containers:
      - name: hello-pod
        image: nigelpoulton/pluralsight-docker-ci:edge
        ports:
        - containerPort: 8080

kubectl delete rc hello-rc

kubectl describe svc hello-svc
kubectl create -f deploy.yml
kubectl describe deploy hello-deploy

kubectl get rs
kubectl describe rs

--update deploy.yml with new image tagged
kubectl apply -f deploy.yml --record

kubectl rollout status deployment hello-deploy
kubectl get deploy hello-deploy
kubectl rollout history deployment hello-deploy

kubectl get rs

kubectl rollout undo deployment hello-deploy --to-revision=1

kubectl delete deploy hello-deploy
```

## basic-ingress.yml
[Docs](https://cloud.google.com/kubernetes-engine/docs/tutorials/http-balancer) explaining how we setup this load balancer which then talks to the service.
```
-- basic-ingress.yml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: basic-ingress
spec:
  backend:
    serviceName: web-svc
    servicePort: 8080

kubectl create -f basic-ingress.yml
get ingress basic-ingress
```

## Dashboard
[Docs from K8s](https://github.com/kubernetes/dashboard/wiki/Creating-sample-user) - not easy to setup for the first time 
```
-- serviceAccount.yml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kube-system

kubctl create -f serviceAccount.yml

-- serviceRole.yml
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kube-system

kubectrl create -f serviceRole.yml

kubectl -n kube-system get secret

kubectl -n kube-system describe secret admin-user-xxxx  

kubectl proxy
```



## Appendix
## pod.yml
We never do this in production (would use a replication controller at minimum)

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
