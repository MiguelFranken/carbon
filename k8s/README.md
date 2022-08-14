# Setting up a microk8s cluster

1. Connect to VPS via ssh 

2. Install microk8s with
```
sudo snap install microk8s --classic --channel=1.21
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
ssh -N -L localhost:16443:localhost:16443 root@185.252.232.119
```

4. Create secrets
```
kubectl create secret generic cc-secrets \
--from-literal=mysql_password=<***GOES HERE***> \
--from-literal=alchemy_api_key=<***GOES HERE***> \
--from-literal=ropsten_private_key=<***GOES HERE***> \
--from-literal=ganache_private_key=<***GOES HERE***> 
```

5. Apply manifests (api, db)
```
kubectl apply -f api.yml
kubectl apply -f db.yml
```

6. Enable Ingress
```
microk8s.enable dns
microk8s.enable ingress
```

7. Certificate
```
# Create a new namespace for the cert-manager
kubectl create namespace cert-manager

# Apply the official yaml file
kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v0.14.2/cert-manager.yaml
kubectl apply -f cluserissuer.yaml
```

8. Apply ingress rules
```
kubectl apply -f ingress.yml
```

