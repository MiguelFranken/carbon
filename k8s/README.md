# Setting up a microk8s cluster

1. Connect to VPS via ssh 

2. Install microk8s with
```
sudo snap install microk8s --classic --channel=1.24
microk8s status --wait-ready
```

3. Get remote access
```
# On server
sudo microk8s kubectl config view --raw > $HOME/.kube/config

# On your machine
# Set a variable to your server IP
SERVERIP=xxx.xxx.xxx.xxx

# Copy the ~/.kube/config from the Server to your machine
scp root@$SERVERIP:~/.kube/config ~/.kube/config

# Open an SSH tunnel (everytime you need to use kubectl)
ssh -N -L localhost:16443:localhost:16443 root@<IP_OF_SERVER>
```

4. Create secrets
```
# On your machine
kubectl create secret generic cc-secrets \
--from-literal=mysql_password=<***GOES HERE***> \
--from-literal=alchemy_api_key=<***GOES HERE***> \
--from-literal=ropsten_private_key=<***GOES HERE***> \
--from-literal=ganache_private_key=<***GOES HERE***> 
```

- Create in GitHub a PAT with package read rights
- 
echo -n <your-github-username>:<PAT> | base64

5. Apply manifests (api, db)
```
# on your machine from the k8s folder
kubectl apply -f api.yaml
kubectl apply -f db.yaml
```

6. Enable Ingress
```
# from the server
microk8s.enable dns
microk8s.enable ingress
```

7. Certificate
We use the Kubernetes certificate management controller (cert-manager) in our cluster to generate and manage TLS certificates that are required for internal communication.

```
# Create a new namespace for the cert-manager
kubectl create namespace cert-manager

# Install cert-manager resources from official YAML manifest file on GitHub
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.9.1/cert-manager.yaml

# To verify the installation, run the following command
kubectl get pods --namespace cert-manager

kubectl apply -f clusterissuer.yaml
```

```
# You can check the status of the issuer
kubectl describe issuers.cert-manager.io letsencrypt-prod
```

8. Apply ingress rules
```
kubectl apply -f ingress.yml
```

---

# Getting pod logs

1. `microk8s kubectl get pods`
2. `microk8s kubectl logs api-<pod-name>`

---

# Bash into pod

1. `microk8s kubectl get pods`
2. `microk8s exec -it <pod-name> -- bash`

# Restart API
`microk8s kubectl delete pod -l tier=api`
