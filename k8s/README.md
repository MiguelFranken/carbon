# Prerequisites
- Virtual Machine
  - For example from [DigitalOcean](https://www.digitalocean.com/products/droplets)
- Domain name and the ability to create DNS records in that domain.
  - [Google Domains](https://domains.google/), [NameCheap](https://www.namecheap.com/) and [GoDaddy](https://www.godaddy.com/) are well known registrars.
- Software
  - [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl): The Kubernetes command-line tool which allows you to configure Kubernetes clusters
  - [curl](https://everything.curl.dev/get): A command-line tool for connecting to a web server using HTTP and HTTPS.

---

# Setting up a microk8s cluster

## Connect to virtual machine via SSH 
```
ssh root@<ip_of_virtual_machine>
```

## Install MicroK8s

[MicroK8s](https://microk8s.io/) will install a minimal, lightweight Kubernetes you can run and use on practically any machine. It can be installed with a snap:
```
sudo snap install microk8s --classic --channel=1.24
microk8s status --wait-ready
```

Enable Addons:
```
# from the server
microk8s.enable dns
microk8s.enable ingress
```

## Get remote access

```
# On server
sudo microk8s kubectl config view --raw > $HOME/.kube/config

# On your machine
# Set a variable to your server IP
SERVERIP=xxx.xxx.xxx.xxx

# Copy the ~/.kube/config from the Server to your local machine
scp root@$SERVERIP:~/.kube/config ~/.kube/config

# Open an SSH tunnel (everytime you need to use kubectl)
ssh -N -L localhost:16443:localhost:16443 root@<IP_OF_SERVER>
```

> If you have already configured other Kubernetes clusters, you should merge the output from the microk8s config with the existing config (copy the output, omitting the first two lines, and paste it onto the end of the existing config using a text editor).

## Create Secrets
```
# On your machine
kubectl create secret generic cc-secrets --from-literal=mysql_password=<INSERT_MYSQL_PASSWORD>
```

### Fetching Containers From Private Repositories

We use GitHub packages to store our built API Docker container images alongside the project's code and allow private access to the published packages.
Our Kubernetes cluster obtains the Docker API image from the private GitHub package registry, which requires setting up a personal access token that allows access to our published package. [The GitHub documentation describes how to create a PTA](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). Make sure that you grant your token `read:packages` permissions, which allows the token holder to download packages from GitHub Package Registry. 

If you want to fetch container images from a private repository from your Kubernetes cluster, you need a way for the kubelet on each node to authenticate to that repository. You can configure image pull secrets to make this possible.

```
echo -n <your-github-username>:<PAT> | base64
<BASE_64_ENCODED_PAT>
```

Insert `<BASE_64_ENCODED_PAT>` into `regcred.yml` and apply manifest by `kubectl apply -f regcred.yml`

## Apply manifests (api, db, redis)
```
# on your machine from the k8s folder
kubectl apply -f api.yaml
kubectl apply -f db.yaml
kubectl apply -f redis.yaml
```

## Certificate
We use [cert-manager](https://cert-manager.io/) in our cluster to generate and manage signed TLS certificates from [Let's Encrypt](https://letsencrypt.org/getting-started/), using an [HTTP-01 challenge](https://letsencrypt.org/docs/challenge-types/#http-01-challenge).

We need to do is install [cert-manager](https://cert-manager.io/), and we'll install it the easy using [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl).
This will create three Deployments, and a bunch of Services and Pods in a new namespace called `cert-manager`.

```
# Install cert-manager resources from official YAML manifest file on GitHub
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.9.1/cert-manager.yaml

# To verify the installation, run the following command
kubectl get pods --namespace cert-manager

# An Issuer is a custom resource which tells cert-manager how to sign a Certificate.
# Let's Encrypt uses the Automatic Certificate Management Environment (ACME) protocol which is why the configuration below is under a key called `acme`.
# The email address is only used by Let's Encrypt to remind you to renew the certificate after 30 days before expiry. You will only receive this email if something goes wrong when renewing the certificate with cert-manager.
kubectl apply -f certificate.yml
kubectl apply -f issuer.yaml

# You can check the status of the issuer
kubectl describe issuers.cert-manager.io letsencrypt-prod
```

## Apply ingress rules

The API is running at this point already inside the Kubernetes cluster but there is no route or proxy through which Internet clients can connect to it, yet! So you won't be able to reach the API yet. Now we will create a Kubernetes Ingress object and this will trigger the creation of a various services which together allow Internet clients to reach the API running inside the Kubernetes cluster.

```
kubectl apply -f ingress.yml
```

## Test Deployment
```
curl -v https://api.miguel-franken.com/token/count
```

---

# Getting pod logs

1. `kubectl get pods`
2. `kubectl logs api-<pod-name>`

---

# Bash into pod

1. `microk8s kubectl get pods`
2. `microk8s exec -it <pod-name> -- bash`

# Restart API
`kubectl delete pod -l tier=api`

# Further Material

- [Deploy cert-manager on Google Kubernetes Engine (GKE) and create SSL certificates for Ingress using Let's Encrypt](https://cert-manager.io/docs/tutorials/getting-started-with-cert-manager-on-google-kubernetes-engine-using-lets-encrypt-for-ingress-ssl)
