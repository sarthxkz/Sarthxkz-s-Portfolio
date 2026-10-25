#!/usr/bin/env bash
# Ship this working tree to the Oracle VM and rebuild the portfolio container.
# Usage (Git Bash, from anywhere):  bash deploy/deploy.sh
# The container is built on the VM (arm64). Vybe's Caddy serves it via deploy/portfolio.caddy.
set -euo pipefail

KEY="${KEY:-$HOME/.ssh/bunkr_oracle}"
HOST="${HOST:-sarthak@161.153.37.106}"
ssh_vm() { ssh -i "$KEY" -o BatchMode=yes "$HOST" "$@"; }

cd "$(dirname "$0")/.."

echo "Uploading source..."
tar --exclude=./node_modules --exclude=./.next --exclude=./.git --exclude=./.impeccable \
    --exclude=./.taste-skill --exclude=./.vercel -czf - . \
  | ssh_vm 'rm -rf ~/portfolio.next && mkdir -p ~/portfolio.next && tar -xzf - -C ~/portfolio.next \
            && rm -rf ~/portfolio && mv ~/portfolio.next ~/portfolio'

echo "Building and starting the container..."
ssh_vm 'cd ~/portfolio/deploy && docker compose up -d --build && docker image prune -f >/dev/null'

echo "Updating the Caddy site and reloading Caddy (no downtime)..."
ssh_vm 'set -e
  install -m 644 ~/portfolio/deploy/portfolio.caddy ~/vybe/deploy/sites/portfolio.caddy
  cd ~/vybe/deploy
  docker compose exec -T caddy caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
  docker compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile'

echo "Done: https://sarthxkz.in"
