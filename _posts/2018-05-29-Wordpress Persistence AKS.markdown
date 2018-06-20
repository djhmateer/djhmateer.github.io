---
layout: post
title:  "Wordpress Persistence in AKS"
date:   2018-05-29 12:06
#menu: review
categories: wordpress 
published: true 
comments: true
---

Wordpress uses persistence in 2 ways:

- `Database` (MySQL/MariaDB) for the data in the blog/site 
- `Filesystem` (wp-content directory off the root of the installation) for storing plugins and themes, which can include executable php code

I'm using the [Azure Database for MySQL](https://azure.microsoft.com/en-gb/services/mysql/) the database. [It is possible](https://codex.wordpress.org/Using_Alternative_Databases) but not recommended to use other databases.   

The filesystem is more complicated.    

[Detailed background](http://unethicalblogger.com/2017/12/01/aks-storage-research.html) on AKS persistence from a Jenkins point of view. 

## How does AKS handle persistence?
AKS can use:

- [Azure Managed Disks](https://azure.microsoft.com/en-gb/pricing/details/managed-disks/)
- [Azure Files](https://azure.microsoft.com/en-gb/services/storage/files/)

Each AKS cluster includes two pre-created storage classes both configured to work with Azure disks.

![ps](/assets/2018-05-29/sc.png)

From [Azure Docs](https://docs.microsoft.com/en-us/azure/aks/azure-disks-dynamic-pv) we can use the Premium_LRS class as our VM supports it. [We can use the cheaper Stardard_LRS](https://kubernetes.io/docs/concepts/storage/storage-classes/#azure-disk) if we desire from this VM

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: charliehoverflylagoons-uploads-claim
  annotations:
    #volume.beta.kubernetes.io/storage-class: managed-premium
    volume.beta.kubernetes.io/storage-class: default 
  labels:
    app: hoverflylagoons
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
```
To change the type of storage (HDD/SSD) change the storage class in the PVC. The performance of the default storage class is similar (after a slower intall) for normal operations. 

![ps](/assets/2018-05-29/pv.png)
PersistentVolume (PV) - representation of storage in the cluster that has been manually provisioned, or dynamically provisioned by Kubernetes using a StorageClass. I never manually create these.

![ps](/assets/2018-05-29/pvc2.png)
PersistentVolmeClaim (PVC) - a request for storage by a user that can be fulfilled by a PersistentVolume

[From here](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/) Dynamic volume provisioning allows storage volumes to be created on-demand. I can define a PVC and it automatically provisions storage

## Azure Disk for all /var/www/html
The simplest strategy is to have an attached disk on the node VM for each wordpress deployment. This disk will hold all the source eg /var/www/html, and all user updated content eg wp-content

However there is a [max data disks limit](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes-general) depending on which VM you have.  

Pros 
- good performance (attached disks can be SSD's)
- easy to setup

Cons 
- can only attach the disk to 1 node VM (so not horizontally scalable). ie if the node goes down so does the website.
- security - it is appealing having all source files baked into the image, so if anything is changed a restart will fix it.


Here is a real example:

![ps](/assets/2018-05-29/pvc.png)

```
# pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: hoverflylagoons-uploads-claim
  annotations:
    volume.beta.kubernetes.io/storage-class: managed-premium
  labels:
    app: wordpress
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi


# deployment.yaml
apiVersion: apps/v1 
kind: Deployment
metadata:
  name: hoverflylagoons
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hoverflylagoons-dep
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: hoverflylagoons-dep
    spec:
      containers:
      - image: wordpress:4.9.6-apache
        name: wordpress
        env:
        - name: WORDPRESS_DB_HOST
          value: secretname.mysql.database.azure.com 
        - name: WORDPRESS_DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-pass
              key: password
        - name: WORDPRESS_DB_USER
          value: dave@secretmysql
        # default name is wordpress
        - name: WORDPRESS_DB_NAME
          value: hoverflylagoons
        ports:
        - containerPort: 80
          name: wordpress
        volumeMounts:
        - name: hoverflylagoons-wordpress-persistent-storage
          mountPath: /var/www/html
      volumes:
      - name: hoverflylagoons-wordpress-persistent-storage
        persistentVolumeClaim:
          claimName: hoverflylagoons-uploads-claim
```

This works well and is performant, and the only limiting factor is the cost and the number of disks you can attach to a VM.


## Azure File Storage for wp-content
This seemed like a smart way to go, and I got so far with this:

```
az storage account create --resource-group MC_aksrg_aks_westeurope --name davenfstest2 --location westeurope --sku Standard_LRS
```
![ps](/assets/2018-05-29/fs.png)

```
# azurefilestorage.yaml
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: azurefile
provisioner: kubernetes.io/azure-file
mountOptions:
  - dir_mode=0777
  - file_mode=0777
  - uid=1000
  - gid=1000 
parameters:
  storageAccount: davenfstest2

# azurefilepvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: azurefile
spec:
  accessModes:
    - ReadWriteMany
  storageClassName: azurefile
  resources:
    requests:
      storage: 5Gi
```

Whilst testing this it is important to delete the secret in Kubernetes for the fileshare, otherwise you'll get permissions errors!

Also I noticed that pods were not being deleted in a timely manner when I deleted the fileshare manually on the Azure portal. Here is a good command to force the delete, however this may mean the pod is still on the cluster. It is much better to delete from kubernetes, which will dynamically delete the fileshare.

```
kubectl delete pod PODNAME --grace-period=0 --force
```

![ps](/assets/2018-05-29/files.png)

All went well with the wordpress installation and the expected files were in the fileshare.

![ps](/assets/2018-05-29/screen2.png)
However I couldn't get the wordpress user to write to that file share. This is the cryptic error you see when the permissions are not correct.

```
kubectl exec -it shell-demo -- /bin/bash
```
After changing the wp-config.php to include `define('FS_METHOD', 'direct');` the permissions error went away. To get this working well, I'd need to bake this into my Dockerfile image.

However a bigger issue is performance:

Even in front end testing the load times are:

- Azure file 2s
- Azure disk HDD and SSD 850ms

A workaround could be to use WP Super Cache to generate html. This does work well and front end performance is fine (wwhen the cache is pointing to the container filesystem eg /var/www/wpsupercache

[Care needs to be taken](https://wordpress.stackexchange.com/a/189570/140467) with FS_METHOD.


![ps](/assets/2018-05-29/screen.png)
Performance on the edit screen was really bad too (this is with no plugins installed apart from defaults). I have measured a difference from 900ms on disk to 17s on file (actually this was for everything loaded from the file share). A more accurate difference is when only wp-content is on the fileshare and the difference is 1s on disk, 2s on fileshare.

[Using Azure Files with Linux](https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-linux) is a more detailed explanation. Perhaps there is a more performant way to access files, and to get the permissions correct than I have tried above.


## Azure Disk for wp-content
This could be a good tactic, however the production website I'm dealing with has a caching plugin enabled (WP Super Cache) which needs access to wp-config.php in the root. So this tactic would give some better security (in that a restart would reset everything back to a base state), but I'd have to deal with plugin issues too.  


## Gluster
Azure doesn't yet have a performant distributed filesystem, so I am trialling [GlusterFS](https://www.gluster.org/) using Azure Disks.  

[Kubepress](https://github.com/codeablehq/KubePress) implements Gluster.   

[Codeable tutorial](https://codeable.io/wordpress-developers-intro-to-docker-part-three-kubernetes/)  uses Gluster

[OSS Canada](https://github.com/OSSCanada/wordpress-aks/tree/master/gluster) uses modified ARM templates from Azure quickstart.


## Appendix
[Dysk](https://github.com/khenidak/dysk) looks promising but very early stages.

