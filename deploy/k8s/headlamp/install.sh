#!/usr/bin/env bash
# Instala/atualiza o Headlamp no namespace headlamp (admin do cluster, kubeconfig padrão).
#   export KUBECONFIG="$HOME/.kube/do-nyc2-emagine-k8s.kubeconfig"
#   bash deploy/k8s/headlamp/install.sh
set -euo pipefail

CHART_VERSION="0.46.0"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

helm repo add headlamp https://kubernetes-sigs.github.io/headlamp/ >/dev/null 2>&1 || true
helm repo update headlamp >/dev/null

kubectl create namespace headlamp --dry-run=client -o yaml | kubectl apply -f -
kubectl label namespace headlamp app.kubernetes.io/part-of=headlamp --overwrite >/dev/null

helm upgrade --install headlamp headlamp/headlamp \
  --namespace headlamp \
  --version "$CHART_VERSION" \
  --values "$DIR/values.yaml" \
  --wait --timeout 5m

kubectl apply -f "$DIR/admin-rbac.yaml"
kubectl -n headlamp get deploy,pods,ingress
